import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from datetime import datetime, timedelta
from neurek.neureka_news.models import DetailsArticle, KeywordArticle, SummaryArticle
from LDA.keyword_for_lda import text_through_LDA_probability
import requests
import numpy as np
from bs4 import BeautifulSoup, NavigableString, Tag
import concurrent.futures
from tqdm import tqdm
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from bareunpy import Tagger



# 페이지 소스 가져오기
driver = webdriver.Chrome()
article_list = []
keyword_dict = {}

# 마지막 페이지 확인하는 조건
last_page_selector = "#contentarea_left > table > tbody > tr > td.pgRR"

day_count = 0
# 현재 날짜와 시간을 가져옴
today = datetime.now()
# 불러올 최소 기사의 수
article_count = 2000

while True:
    if len(article_list) >= article_count:
        break

    # 오늘 날짜에서 하루를 빼서 어제의 날짜를 계산
    day_day = today - timedelta(days=day_count)
    # 어제의 날짜를 원하는 형식으로 출력
    formatted_date = day_day.strftime("%Y-%m-%d")
    BASE_URL = "https://finance.naver.com/news/mainnews.naver?date=" + formatted_date + "&page="

    # 첫 번째 페이지부터 시작하여 마지막 페이지까지 크롤링.
    current_page = 1
    while True:
        # 페이지마다 URL을 생성합니다.
        url = BASE_URL + str(current_page)
        driver.get(url)
        time.sleep(0.2)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        # 페이지의 뉴스 항목을 크롤링
        for idx in range(1, 21):  # 한 페이지당 최대 20개의 기사가 있으므로 범위를 1부터 10까지
            article_dict = {}
            # Thumbnail URL 가져오기
            # thumbnail_tag = soup.select_one(f'#contentarea_left > div.mainNewsList._replaceNewsLink > ul > li:nth-child({idx}) > dl > dt > a > img')
            # article_dict['thumbnail_url'] = thumbnail_tag.get('src') if thumbnail_tag else None

            # 기사 제목과 링크 가져오기
            article_subjects = soup.select(f'#contentarea_left > div.mainNewsList._replaceNewsLink > ul > li:nth-child({idx}) > dl > dd.articleSubject > a')

            for article_subject in article_subjects:
                article_dict['article_title'] = article_subject.text.strip() if article_subject else None
                article_dict['article_link'] = article_subject['href'] if article_subject else None

            # 기사 요약, 언론사, 날짜 및 시간 가져오기
            article_summary = soup.select_one(f'#contentarea_left > div.mainNewsList._replaceNewsLink > ul > li:nth-child({idx}) > dl > dd.articleSummary')
            if article_summary:
                # Summary 정리
                summary_text = article_summary.text.strip().replace('\n', '').replace('\t', '')
                article_dict['article_summary'] = summary_text.split('Press')[0].strip()

                # 언론사 정보 확인
                press_tag = article_summary.find('span', class_='press')
                article_dict['press'] = press_tag.text.strip() if press_tag else None

                # 날짜 및 시간 정보 확인
                date_time_tag = article_summary.find('span', class_='wdate')
                date_time = date_time_tag.text.strip() if date_time_tag else None
                article_dict['date_time'] = date_time[:-3]

            if article_dict.get('article_link'):
                article_list.append(article_dict)

        # 다음 페이지 확인
        try:
            next_button = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.CSS_SELECTOR, last_page_selector)))
            if 'disabled' in next_button.get_attribute('class'):
                break
        except TimeoutException:
            break

        # 다음 페이지로 이동합니다.
        current_page += 1

    day_count += 1

# WebDriver 종료
driver.quit()

print("[+] crawling done")

# 확인용 출력
# for idx, article in enumerate(article_list, start=1):
#     print(f"Article {idx}:")
#     print(f"Thumbnail URL: {article.get('thumbnail_url', 'N/A')}")
#     print(f"Title: {article.get('article_title', 'N/A')}")
#     print(f"Link: {article.get('article_link', 'N/A')}")
#     print(f"Summary: {article.get('article_summary', 'N/A')}")
#     print(f"Press: {article.get('press', 'N/A')}")
#     print(f"Date & Time: {article.get('date_time', 'N/A')}")
#     print()

#### 크롤링 후 처리
# 바른AI를 사용해 형태소 분석을 진행
# https://bareun.ai/docs
API_KEY = "koba-E6NTYJA-XRXUDDI-U26NETA-QDNVN2A"
# API_KEY = "koba-2XBK6DY-HNAE4VY-RYZWFHA-GCGGG2A"
tagger = Tagger(API_KEY, 'localhost', 5757)

# Sentence Transformer 모델 로드
model = SentenceTransformer('ddobokki/klue-roberta-small-nli-sts')


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
    time.sleep(0.2)  # 서버에 과부하를 주지 않기 위해 잠시 대기
    soup = BeautifulSoup(response.content, "html.parser")

    # `soup.find("article")`의 결과가 None인 경우를 처리
    article = soup.find("article")
    if article:
        article_text = article.get_text(strip=True)
        # article_text가 있는 경우에만 이미지 태그를 찾음
        img_tag = soup.select_one('#img1')
        img_src = img_tag['data-src'] if img_tag else None
    else:
        # article_text가 없는 경우, img_src도 None으로 설정
        article_text = "No article text found"
        img_src = None

    return article_text, img_src


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
    text, thumbnail_src = keyword_extraction(url)
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
            detail_date=article["date_time"],
            detail_topic=topic,
            detail_keywords=keywords
        )

        original_article.save()

        summary_article = SummaryArticle(
            thumbnail_url=thumbnail_src,
            article_title=article["article_title"],
            article_link=url,
            article_summary=article["article_summary"],
            press=article["press"],
            date_time=article["date_time"],
            nouns=nouns,
            topic=topic,
            keywords=keywords
        )

        summary_article.save()

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
    stop_words_path = "LDA/stop_words.txt"
    stop_words = load_stop_words(stop_words_path)

    # 오늘 요약 기사를 일단 지우고
    SummaryArticle.delete_all()

    # ThreadPoolExecutor를 사용한 병렬 처리
    # 다시 하나씩 넣어줌
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        # process_article 함수 호출 시 stop_words 전달을 위한 functools.partial 사용
        from functools import partial
        process_with_stop_words = partial(process_article, stop_words=stop_words)
        list(tqdm(executor.map(process_with_stop_words, article_list), total=len(article_list), desc="Processing articles"))

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
    keyword_news = update_keyword_dict(article_list, keyword_dict)

    # 기사의 키워드별 카운트를 db에 저장
    # 기사의 키워드별 카운트를 저장하는 db는 저장하기 전에 전체 삭제하도록 해둠
    KeywordArticle.save_keywords(keyword_dict)
