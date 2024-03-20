from django.conf import settings
import os
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min
import requests
from bs4 import BeautifulSoup
from bareunpy import Tagger
from sentence_transformers import SentenceTransformer


model = SentenceTransformer('ddobokki/klue-roberta-small-nli-sts')
API_KEY = "koba-E6NTYJA-XRXUDDI-U26NETA-QDNVN2A"
# print("API 키 입니다." , API_KEY)
tagger = Tagger(API_KEY, 'localhost', 5757)  # KPF에서 제공하는 바른 형태소분석기

# 불용어
# 현재 스크립트 파일의 경로를 가져옵니다.
current_file_path = os.path.abspath(__file__)
# 현재 스크립트 파일의 디렉토리를 가져옵니다.
current_dir = os.path.dirname(current_file_path)
# stop_words.txt 파일의 상대 경로를 생성합니다.
stop_words_path = os.path.join(current_dir, 'LDA', 'stop_words.txt')
# 이제 파일을 열 수 있습니다.
with open(stop_words_path, 'r', encoding='utf-8') as file:
    stop_words = set(line.strip() for line in file)

def keyword_nouns(text):
    tokenized_doc = tagger.pos(text)
    tokenized_nouns = ' '.join([word[0] for word in tokenized_doc if word[1] in ['NNG', 'NNP'] and word[0] not in stop_words])
    return tokenized_nouns


def kmeans_cluster(link_list):

    nouns_list = []

    for link in link_list:
        response = requests.get(link)
        soup = BeautifulSoup(response.content, "html.parser")
        article_text = soup.find("article").get_text(strip=True)

        nouns_list.append(keyword_nouns(article_text))

    # 텍스트 벡터화
    tfidf_vectorizer = TfidfVectorizer()
    # tfidf_matrix = tfidf_vectorizer.fit_transform([article['nouns'] for article in news_data.get(keyword)])
    tfidf_matrix = tfidf_vectorizer.fit_transform(nouns_list)

    # KMeans 클러스터링
    kmeans = KMeans(n_clusters=4, random_state=42).fit(tfidf_matrix)

    # 클러스터링 결과에 따라 각 그룹의 대표 기사를 선택합니다.
    # 여기서는 각 클러스터의 중심에 가장 가까운 기사를 대표 기사로 선택합니다.
    closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, tfidf_matrix)
    representative_articles = [link_list[idx] for idx in closest]

    file_path = os.path.join(settings.BASE_DIR, 'neureka_news', 'news_data.json')
    with open(file_path, 'r', encoding='utf-8') as file:
        news_data = json.load(file)

    # 특정 article_title을 검색하는 예시

    # 검색 결과를 담을 변수 초기화
    search_result = []

    # 5. 결과 출력
    for article_link in representative_articles:
        # news_data를 순회하면서 article_title이 일치하는 항목을 찾기
        for article in news_data:
            if article["article_link"] == article_link:
                search_result.append(article)
                break

    return search_result