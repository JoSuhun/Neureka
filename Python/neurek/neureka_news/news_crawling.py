import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
import json

from datetime import datetime, timedelta


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
        for idx in range(1, 11):  # 한 페이지당 최대 10개의 기사가 있으므로 범위를 1부터 10까지
            article_dict = {}
            flag = True
            # Thumbnail URL 가져오기
            thumbnail_tag = soup.select_one(f'#contentarea_left > div.mainNewsList._replaceNewsLink > ul > li:nth-child({idx}) > dl > dt > a > img')
            article_dict['thumbnail_url'] = thumbnail_tag.get('src') if thumbnail_tag else None

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


for idx, article in enumerate(article_list, start=1):
    print(f"Article {idx}:")
    print(f"Thumbnail URL: {article.get('thumbnail_url', 'N/A')}")
    print(f"Title: {article.get('article_title', 'N/A')}")
    print(f"Link: {article.get('article_link', 'N/A')}")
    print(f"Summary: {article.get('article_summary', 'N/A')}")
    print(f"Press: {article.get('press', 'N/A')}")
    print(f"Date & Time: {article.get('date_time', 'N/A')}")
    print()


with open('news_data.json', 'w', encoding='utf-8') as f:
    json.dump(article_list, f, ensure_ascii=False, indent=4)

print("[+] done")
