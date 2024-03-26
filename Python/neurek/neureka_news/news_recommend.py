import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))


from neurek.neureka_news.models import DetailsArticle
from neurek.neureka_news.LDA.keyword_for_lda import text_through_LDA_probability
import requests
import numpy as np
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from bareunpy import Tagger
import time


#### 크롤링 후 처리
# 바른AI를 사용해 형태소 분석을 진행
# https://bareun.ai/docs
API_KEY = "koba-E6NTYJA-XRXUDDI-U26NETA-QDNVN2A"
# API_KEY = "koba-2XBK6DY-HNAE4VY-RYZWFHA-GCGGG2A"
tagger = Tagger(API_KEY, 'localhost', 5757)

# Sentence Transformer 모델 로드
model = SentenceTransformer('ddobokki/klue-roberta-small-nli-sts')


def keyword_extraction(url):
    response = requests.get(url)
    time.sleep(0.2)  # 서버에 과부하를 주지 않기 위해 잠시 대기
    soup = BeautifulSoup(response.content, "html.parser")

    # `soup.find("article")`의 결과가 None인 경우를 처리
    article = soup.find("article")
    if article:
        article_text = article.get_text(strip=True)
    else:
        article_text = {"error": "뭔가 잘못된것 같아요"}

    return article_text

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

def keyword_ext(text, stop_words):
    tokenized_doc = tagger.pos(text)
    # stop_words를 고려하여 불용어가 아닌 명사만 추가
    tokenized_nouns = ' '.join([word[0] for word in tokenized_doc if word[1] in ['NNG', 'NNP'] and word[0] not in stop_words])

    n_gram_range = (1, 1)
    count = CountVectorizer(ngram_range=n_gram_range).fit([tokenized_nouns])
    candidates = count.get_feature_names_out()

    doc_embedding = model.encode([text])[0]
    candidate_embeddings = model.encode(candidates)

    return mmr(doc_embedding, candidate_embeddings, candidates, top_n=3, diversity=0.3)

def load_stop_words(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        stop_words = set(line.strip() for line in file)
    return stop_words


def recommend_news(url):
    # 해당 URL에 해당하는 기사
    article_data = DetailsArticle.find_by_url(url)

    # 불러온 내용이 있는지 확인
    if article_data:
        # 그 기사에 topic이 존재하는지 확인하고, 없을 때 topic과 keywords를 추가
        if DetailsArticle.is_topic_empty_for_url(url):

            stop_words_path = "LDA/stop_words.txt"
            stop_words = load_stop_words(stop_words_path)

            article_text = keyword_extraction(url)

            new_topic = text_through_LDA_probability(article_text)
            new_keywords = keyword_ext(article_text, stop_words)

            update_success = DetailsArticle.update_topic_and_keywords(url, new_topic, new_keywords)


            if update_success:
                print("Topic and keywords were successfully updated.")
            else:
                print("Failed to update topic and keywords.")
        else:
            new_keywords = article_data['detail_keywords']
            print("Article already has a topic.")

            # 비슷한 기사를 불러오기
        similar_urls = DetailsArticle.find_urls_by_keywords_sorted_by_average_rating(new_keywords)
        return similar_urls


    else:
        print("추천 기사를 받는데 오류입니다.")
        return []


# #확인용
# import pprint
# if __name__ == "__main__":
#     start_time = time.time()
#
#     recommend_news_list = []
#     pprint.pprint(recommend_news("https://n.news.naver.com/mnews/article/366/0000980751"))
#     end_time = time.time()  # 종료 시간 저장
#     elapsed_time = end_time - start_time  # 경과 시간 계산
#
#     print(f"Execution time: {elapsed_time} seconds")