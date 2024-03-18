import os
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min


def kmeans_cluster(keyword):
    # 1. 데이터 로딩
    current_directory = os.path.dirname(__file__)
    news_path = os.path.join(current_directory, 'news_data.json')
    keyword_path = os.path.join(current_directory, 'keyword_data.json')
    with open(news_path, 'r', encoding='utf-8') as file:
        news_data = json.load(file)

    # 2. 텍스트 벡터화
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform([article['nouns'] for article in news_data.get(keyword)])

    # 3. KMeans 클러스터링을 이용해 기사를 10개의 그룹으로 나눕니다.
    kmeans = KMeans(n_clusters=4, random_state=42).fit(tfidf_matrix)

    # 4. 클러스터링 결과에 따라 각 그룹의 대표 기사를 선택합니다.
    # 여기서는 각 클러스터의 중심에 가장 가까운 기사를 대표 기사로 선택합니다.
    closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, tfidf_matrix)
    representative_articles = [news_data[idx]['article_title'] for idx in closest]

    # 5. 결과 출력
    for title in representative_articles:
        print(title)
