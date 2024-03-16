import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from datetime import datetime, timedelta
import concurrent.futures
import os
import requests
from bs4 import BeautifulSoup
import json
import concurrent.futures
from tqdm import tqdm

# 페이지 소스 가져오기
driver = webdriver.Chrome()
article_list = []
keyword_dict = {}

# 마지막 페이지 확인하는 조건
last_page_selector = "#contentarea_left > table > tbody > tr > td.pgRR"

day_count = 0
# 현재 날짜와 시간을 가져옴
today = datetime.now()

def save_article_list(article_list):
    file_path = 'lda_news_data.json'
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(article_list, f, ensure_ascii=False, indent=4)


try:
    while True:
        if len(article_list) >= 100:
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
            time.sleep(0.5)
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')

            # 페이지의 뉴스 항목을 크롤링
            for idx in range(1, 11):
                for idx in range(1, 11):  # 한 페이지당 최대 10개의 기사가 있으므로 범위를 1부터 10까지
                    article_dict = {}
                    flag = True
                    # Thumbnail URL 가져오기
                    thumbnail_tag = soup.select_one(
                        f'#contentarea_left > div.mainNewsList._replaceNewsLink > ul > li:nth-child({idx}) > dl > dt > a > img')
                    article_dict['thumbnail_url'] = thumbnail_tag.get('src') if thumbnail_tag else None

                    # 기사 제목과 링크 가져오기
                    article_subjects = soup.select(
                        f'#contentarea_left > div.mainNewsList._replaceNewsLink > ul > li:nth-child({idx}) > dl > dd.articleSubject > a')

                    for article_subject in article_subjects:
                        article_dict['article_title'] = article_subject.text.strip() if article_subject else None
                        article_dict['article_link'] = article_subject['href'] if article_subject else None

                    # 기사 요약, 언론사, 날짜 및 시간 가져오기
                    article_summary = soup.select_one(
                        f'#contentarea_left > div.mainNewsList._replaceNewsLink > ul > li:nth-child({idx}) > dl > dd.articleSummary')
                    if article_summary:
                        # Summary 정리
                        summary_text = article_summary.text.strip().replace('\n', '').replace('\t', '')
                        article_dict['article_summary'] = summary_text.split('Press')[0].strip()

                        # 언론사 정보 확인
                        press_tag = article_summary.find('span', class_='press')
                        article_dict['press'] = press_tag.text.strip() if press_tag else None

                        # 날짜 및 시간 정보 확인
                        date_time_tag = article_summary.find('span', class_='wdate')
                        article_dict['date_time'] = date_time_tag.text.strip() if date_time_tag else None
                        article_dict['keyword'] = []
                        article_dict['nouns'] = []

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

except Exception as e:
    print(f"[!] Error occurred: {e}")

finally:
    # WebDriver 종료
    driver.quit()
    # 마지막으로 article_list를 저장
    save_article_list(article_list)
    print("[+] Crawling done and data saved.")


file_path = os.path.join(os.getcwd(), 'lda_news_data.json')


def keyword_extraction(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")
        article_tag = soup.find("article")
        return article_tag.get_text(strip=True) if article_tag else None
    except Exception as e:
        print(f"Error extracting article: {e}")
        return None

def save_results(article_texts):
    with open('lda_test_data.json', 'w', encoding='utf-8') as f:
        json.dump(article_texts, f, ensure_ascii=False, indent=4)

try:
    with open(file_path, 'r', encoding='utf-8') as file:
        news_data = json.load(file)

    article_texts = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(keyword_extraction, article["article_link"]) for article in news_data]
        for future in tqdm(concurrent.futures.as_completed(futures), total=len(futures), desc="Extracting articles"):
            article_text = future.result()
            if article_text:
                article_texts.append(article_text)

    # 프로그램이 정상적으로 완료된 후 한 번에 결과를 저장합니다.
    save_results(article_texts)

except Exception as e:
    print(f"[!] An error occurred: {e}. Saving what has been extracted so far.")
    # 예외 발생 시 현재까지의 결과를 저장합니다.
    save_results(article_texts)
finally:
    print("[+] Crawling and extraction process is completed. Check 'lda_test_data.json' for the results.")
