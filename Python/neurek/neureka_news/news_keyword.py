import time
from neurek.neureka_news.models import DetailsArticle
from LDA.keyword_for_lda import text_through_LDA_probability
import requests
import numpy as np
from bs4 import BeautifulSoup, NavigableString, Tag
import json
import concurrent.futures
from tqdm import tqdm
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from bareunpy import Tagger
import os

# 바른AI를 사용해 형태소 분석을 진행
# https://bareun.ai/docs
API_KEY = "koba-E6NTYJA-XRXUDDI-U26NETA-QDNVN2A"
# API_KEY = "koba-2XBK6DY-HNAE4VY-RYZWFHA-GCGGG2A"
tagger = Tagger(API_KEY, 'localhost', 5757)

# Sentence Transformer 모델 로드
model = SentenceTransformer('ddobokki/klue-roberta-small-nli-sts')

# # 처음부터 100개의 데이터만 읽기
# with open('LDA/lda_test_data_filtered.json', 'r', encoding='utf-8') as f:
#     data = json.load(f)

def mmr(doc_embedding, candidate_embeddings, words, top_n, diversity):
    word_doc_similarity = cosine_similarity(candidate_embeddings, doc_embedding.reshape(1, -1))
    word_similarity = cosine_similarity(candidate_embeddings)

    keywords_idx = [np.argmax(word_doc_similarity)]
    candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

    for _ in range(top_n - 1):
        candidate_similarities = word_doc_similarity[candidates_idx, :]
        target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)

        mmr_values = (1 - diversity) * candidate_similarities.T - diversity * target_similarities
        mmr_idx = candidates_idx[np.argmax(mmr_values)]

        keywords_idx.append(mmr_idx)
        candidates_idx.remove(mmr_idx)

    top_keywords = [words[idx] for idx in keywords_idx]
    return top_keywords


# 태그 뗀 text
def keyword_extraction(url):
    response = requests.get(url)
    time.sleep(0.2)
    soup = BeautifulSoup(response.content, "html.parser")
    article_text = soup.find("article").get_text(strip=True)

    return article_text


# 태그 안뗀 text
# 본문 내용을 처리하는 함수
def process_element(element):
    content = ''
    if isinstance(element, NavigableString):
        if str(element).strip() != '':
            content += str(element).strip() + '\n'
    elif isinstance(element, Tag):
        if element.name == 'strong':
            content += f"<strong>{element.text.strip()}</strong>\n"
        elif element.name == 'br':
            content += '\n'
        elif element.name == 'span' and element.get('data-type') == 'ore':
            content += f"{element.text.strip()}\n"
        elif element.name == 'img':
            img_src = element.get('data-src')
            content += f"<img src='{img_src}'>\n"
        else:
            for child in element.children:
                content += process_element(child)  # 자식 요소에 대한 재귀적 처리
    return content

# 웹페이지에서 본문 내용 추출하기
def extract_content_from_url(url):
    response = requests.get(url)
    html = response.text

    soup = BeautifulSoup(html, 'html.parser')
    article = soup.find('article', id='dic_area')

    return process_element(article)


# 불용어 목록 로드
def load_stop_words(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        stop_words = set(line.strip() for line in file)
    return stop_words


def keyword_ext(text, stop_words):
    tokenized_doc = tagger.pos(text)
    # stop_words를 고려하여 불용어가 아닌 명사만 추가
    tokenized_nouns = ' '.join([word[0] for word in tokenized_doc if word[1] in ['NNG', 'NNP'] and word[0] not in stop_words])

    n_gram_range = (1, 1)
    count = CountVectorizer(ngram_range=n_gram_range).fit([tokenized_nouns])
    candidates = count.get_feature_names_out()

    doc_embedding = model.encode([text])[0]
    candidate_embeddings = model.encode(candidates)

    return mmr(doc_embedding, candidate_embeddings, candidates, top_n=3, diversity=0.3), tokenized_nouns


def process_article(article, stop_words):
    # 여기서 DB에 원문기사를 저장하는 로직
    url = article["article_link"]
    text = keyword_extraction(url)
    topic = text_through_LDA_probability(text)
    keywords, nouns = keyword_ext(text, stop_words)
    article["keywords"] = keywords
    article["topic"] = topic

    if topic != "기타":
        original_article = DetailsArticle(
            detail_url=url,
            detail_text=extract_content_from_url(url),
            detail_title=article["article_title"],
            detail_press=article["press"],
            detail_date=article["date_time"]
        )

        original_article.save()

    return article


def update_keyword_dict(news_data, keyword_dict):
    for article in tqdm(news_data, desc="Updating keyword dict"):
        topic = article["topic"]
        if topic in keyword_dict:
            for keyword in article["keywords"]:
                # 해당 키워드가 해당 토픽의 키워드 딕셔너리에 없으면 초기화
                if keyword not in keyword_dict[topic]:
                    keyword_dict[topic][keyword] = {"count": 0, "links": []}

                # 키워드 count 증가 및 링크 추가
                keyword_dict[topic][keyword]["count"] += 1
                keyword_dict[topic][keyword]["links"].append(article["article_link"])
    return keyword_dict


if __name__ == "__main__":
    file_path = 'news_data.json'
    keyword_path = 'keyword_data.json'
    stop_words_path = "LDA/stop_words.txt"
    stop_words = load_stop_words(stop_words_path)

    with open(file_path, 'r', encoding='utf-8') as file:
        news_data = json.load(file)

    # ThreadPoolExecutor를 사용한 병렬 처리
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        # process_article 함수 호출 시 stop_words 전달을 위한 functools.partial 사용
        from functools import partial
        process_with_stop_words = partial(process_article, stop_words=stop_words)
        list(tqdm(executor.map(process_with_stop_words, news_data), total=len(news_data), desc="Processing articles"))

    keyword_dict = {
        "반도체": {},
        "금융": {},
        "기술": {},
        "경영": {},
        "가상화폐": {},
        "유가증권": {},
        "정치": {},
        "해외토픽": {},
    }

    # 모든 기사 처리 완료 후 keyword_news 업데이트
    keyword_news = update_keyword_dict(news_data, keyword_dict)

    # 결과 저장
    with open('news_data.json', 'w', encoding='utf-8') as file:
        json.dump(news_data, file, ensure_ascii=False, indent=4)

    with open('keyword_data.json', 'w', encoding='utf-8') as file:
        json.dump(keyword_dict, file, ensure_ascii=False, indent=4)


