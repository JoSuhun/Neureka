import time

import requests
import numpy as np
from bs4 import BeautifulSoup
import json
import concurrent.futures
from tqdm import tqdm
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from bareunpy import Tagger

# 바른AI를 사용해 형태소 분석을 진행
API_KEY = "koba-E6NTYJA-XRXUDDI-U26NETA-QDNVN2A"
tagger = Tagger(API_KEY, 'localhost', 5757)

# Sentence Transformer 모델 로드
model = SentenceTransformer('ddobokki/klue-roberta-small-nli-sts')


def mmr(article_id, doc_embedding, candidate_embeddings, words, top_n, diversity):
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


def keyword_extraction(url):
    response = requests.get(url)
    time.sleep(0.2)
    soup = BeautifulSoup(response.content, "html.parser")
    article_text = soup.find("article").get_text(strip=True)
    return article_text

# 불용어 목록 로드
def load_stop_words(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        stop_words = set(line.strip() for line in file)
    return stop_words


def keyword_ext(article_id, text, stop_words):
    tokenized_doc = tagger.pos(text)
    # stop_words를 고려하여 불용어가 아닌 명사만 추가
    tokenized_nouns = ' '.join([word[0] for word in tokenized_doc if word[1] in ['NNG', 'NNP'] and word[0] not in stop_words])

    n_gram_range = (1, 1)
    count = CountVectorizer(ngram_range=n_gram_range).fit([tokenized_nouns])
    candidates = count.get_feature_names_out()

    doc_embedding = model.encode([text])[0]
    candidate_embeddings = model.encode(candidates)

    return mmr(article_id, doc_embedding, candidate_embeddings, candidates, top_n=3, diversity=0.3), tokenized_nouns



def process_article(article, stop_words):
    url = article["article_link"]
    text = keyword_extraction(url)
    keywords, nouns = keyword_ext(article["index"], text, stop_words)  # stop_words 인자 추가
    article["keywords"] = keywords
    article["nouns"] = nouns
    return article


def update_keyword_news(news_data, stop_words):
    keyword_news = {}
    for article in tqdm(news_data, desc="Updating keyword news"):
        if "keywords" in article:
            for keyword in article["keywords"]:
                if keyword not in stop_words:  # 불용어가 아닌 경우에만 처리
                    if keyword not in keyword_news:
                        keyword_news[keyword] = {"count": 0, "links": []}
                    keyword_news[keyword]["count"] += 1
                    keyword_news[keyword]["links"].append(article["article_link"])
    return keyword_news

if __name__ == "__main__":
    file_path = 'news_data.json'
    keyword_path = 'keyword_data.json'
    stop_words_path = 'stop_words.txt'
    stop_words = load_stop_words(stop_words_path)

    with open(file_path, 'r', encoding='utf-8') as file:
        news_data = json.load(file)

    for i, article in enumerate(news_data):
        article["index"] = i

    # ThreadPoolExecutor를 사용한 병렬 처리
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        # process_article 함수 호출 시 stop_words 전달을 위한 functools.partial 사용
        from functools import partial
        process_with_stop_words = partial(process_article, stop_words=stop_words)
        list(tqdm(executor.map(process_with_stop_words, news_data), total=len(news_data), desc="Processing articles"))
    # 모든 기사 처리 완료 후 keyword_news 업데이트
    keyword_news = update_keyword_news(news_data, stop_words)

    # 결과 저장
    with open('news_data.json', 'w', encoding='utf-8') as file:
        json.dump(news_data, file, ensure_ascii=False, indent=4)

    with open('keyword_data.json', 'w', encoding='utf-8') as file:
        json.dump(keyword_news, file, ensure_ascii=False, indent=4)
