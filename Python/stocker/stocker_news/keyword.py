import os
import numpy as np
from bs4 import BeautifulSoup
import json
import time
import itertools
from selenium import webdriver
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from bareunpy import Tagger

# 바른AI를 사용해 형태소 분석을 진행합니다
# 형태소 분석을 위해서 Docker 환경에 GPU 버전으로 컨테이너와 이미지를 설치했습니다.
# 도커 이미지 설치 문서 URL : https://bareun.ai/docs -> 설치 -> 도커로 설치
# 바른 image gpu버전  도커 허브 : https://hub.docker.com/r/bareunai/bareun-gpu
API_KEY = "koba-E6NTYJA-XRXUDDI-U26NETA-QDNVN2A"
# print("API 키 입니다." , API_KEY)
tagger = Tagger(API_KEY,'localhost', 5757) # KPF에서 제공하는 바른 형태소분석기

# 모델 선정 과정입니다. 기사의 특이한 단어를 추출 -> 기관이나 기업에 대한 단어를 최소화 ddobokki님이 finetunig한 roberta 모델을 사용했습니다.
# model = SentenceTransformer('KPF/KPF-bert-ner')
# model = SentenceTransformer('yunaissance/kpfbert-base')
# model = SentenceTransformer('jinmang2/kpfbert')
# model = SentenceTransformer('bongsoo/kpf-sbert-v1.1')
# model = SentenceTransformer('bongsoo/kpf-sbert-128d-v1')
model = SentenceTransformer('ddobokki/klue-roberta-small-nli-sts')


def keyword_extraction(url, keyword_dict = {}):
    # 기사 리스트 속 기사
    driver2 = webdriver.Chrome()
    driver2.get(url)
    time.sleep(0.2)
    html_content = driver2.page_source
    beautiful_soup = BeautifulSoup(html_content, "html.parser")
    article_text = beautiful_soup.find("article").get_text(strip=True)
    return article_text

def keyword_ext(article_id, text):

    tokenized_doc = tagger.pos(text)
    tokenized_nouns = ' '.join([word[0] for word in tokenized_doc if word[1] == 'NNG' or word[1] == 'NNP'])

    n_gram_range = (1,1)
    # print(tokenized_nouns)
    count = CountVectorizer(ngram_range=n_gram_range).fit([tokenized_nouns])
    candidates = count.get_feature_names_out()

    doc_embedding = model.encode([text])
    candidate_embeddings = model.encode(candidates)
    return mmr(article_id, doc_embedding, candidate_embeddings, candidates, top_n=3, diversity=0.3), tokenized_nouns

def mmr(article_id, doc_embedding, candidate_embeddings, words, top_n, diversity):

    if len(words) <= top_n:  # 후보 단어 목록이 적으면 그냥 있는 단어가 다 키워드임
        return words    # 데이터가 적다면 그냥 무시해버리는 방법도 있음 => return []

    # 문서와 각 키워드들 간의 유사도가 적혀있는 리스트
    word_doc_similarity = cosine_similarity(candidate_embeddings, doc_embedding)

    # 각 키워드들 간의 유사도
    word_similarity = cosine_similarity(candidate_embeddings)

    # 문서와 가장 높은 유사도를 가진 키워드의 인덱스를 추출.
    # 만약, 2번 문서가 가장 유사도가 높았다면
    # keywords_idx = [2]
    keywords_idx = [np.argmax(word_doc_similarity)]

    # 가장 높은 유사도를 가진 키워드의 인덱스를 제외한 문서의 인덱스들
    # 만약, 2번 문서가 가장 유사도가 높았다면
    # ==> candidates_idx = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10 ... 중략 ...]
    candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

    # 최고의 키워드는 이미 추출했으므로 top_n-1번만큼 아래를 반복.
    # ex) top_n = 5라면, 아래의 loop는 4번 반복됨.
    for _ in range(top_n - 1):
        candidate_similarities = word_doc_similarity[candidates_idx, :]
        target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)

        # MMR을 계산
        mmr = (1-diversity) * candidate_similarities - diversity * target_similarities.reshape(-1, 1)
        mmr_idx = candidates_idx[np.argmax(mmr)]

        # keywords & candidates를 업데이트
        keywords_idx.append(mmr_idx)
        candidates_idx.remove(mmr_idx)

    # print(keywords_idx)
    top_keywords = [words[idx] for idx in keywords_idx]
    for keyword in top_keywords :
        tmp = keyword_news.get(keyword, {"cnt": 0, "article_id": []})
        tmp["cnt"] += 1
        tmp["article_id"].append(article_id)
        keyword_news[keyword] = tmp
    return top_keywords

if __name__ == "__main__":

    # 스크립트의 현재 디렉토리를 기반으로 파일의 경로를 설정합니다.
    current_directory = os.path.dirname(__file__)
    file_path = os.path.join(current_directory, 'news_data.json')
    keyword_path = os.path.join(current_directory, 'keyword_data.json')
    # 키워드에 연관된 기사
    try:
        with open(keyword_path, 'r', encoding='utf-8') as file:
            keyword_news = json.load(file)
    except FileNotFoundError:
        # 파일이 없을 경우 빈 딕셔너리로 처리
        keyword_news = {}

    # 기사 데이터
    with open(file_path, 'r', encoding='utf-8') as file:
        news_data = json.load(file)

    a = time.time()
    for i in range(len(news_data)) :     
        start_time = time.time()
        url = news_data[i]["article_link"]
        text = keyword_extraction(url)
        news_data[i]["id"] = i
        news_data[i]["keyword"], news_data[i]["nouns"] = keyword_ext(i, text)
        print(f'{i}번째 기사 작업 시간: {time.time()-start_time}초')
    print("데이터 처리 총 시간: ", time.time() - a)

    with open('news/news_data.json', 'w', encoding='utf-8') as file:
        json.dump(news_data, file, ensure_ascii=False, indent=4)  # 한글 등 유니코드 문자를 그대로 유지
    
    with open('news/keyword_data.json', 'w', encoding='utf-8') as file:
        json.dump(keyword_news, file, ensure_ascii=False, indent=4)  # 한글 등 유니코드 문자를 그대로 유지import time