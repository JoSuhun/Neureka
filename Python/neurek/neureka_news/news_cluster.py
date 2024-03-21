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
    # 링크 리스트가 비었을 경우 빈 리스트 반환
    if not link_list:
        return []

    # 링크 리스트의 길이가 4 미만이면 클러스터링 없이 바로 결과 반환
    if len(link_list) < 4:
        file_path = os.path.join(settings.BASE_DIR, 'neureka_news', 'news_data.json')
        with open(file_path, 'r', encoding='utf-8') as file:
            news_data = json.load(file)

        search_result = []
        for article_link in link_list:
            for article in news_data:
                if article["article_link"] == article_link:
                    search_result.append(article)
                    break
        return search_result

    # 링크 리스트의 길이가 4 이상일 때는 아래의 로직을 실행
    nouns_list = []
    for link in link_list:
        response = requests.get(link)
        soup = BeautifulSoup(response.content, "html.parser")
        article_text = soup.find("article").get_text(strip=True)
        nouns_list.append(keyword_nouns(article_text))

    # 텍스트 벡터화
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(nouns_list)

    # KMeans 클러스터링
    kmeans = KMeans(n_clusters=4, random_state=42).fit(tfidf_matrix)

    # 클러스터의 중심에 가장 가까운 기사를 선택
    closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, tfidf_matrix)
    representative_articles = [link_list[idx] for idx in closest]

    file_path = os.path.join(settings.BASE_DIR, 'neureka_news', 'news_data.json')
    with open(file_path, 'r', encoding='utf-8') as file:
        news_data = json.load(file)

    search_result = []
    for article_link in representative_articles:
        for article in news_data:
            if article["article_link"] == article_link:
                search_result.append(article)
                break

    return search_result
