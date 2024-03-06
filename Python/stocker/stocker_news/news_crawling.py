from selenium import webdriver
from bs4 import BeautifulSoup
import time

# WebDriver 설정
driver = webdriver.Chrome()
# 네이버 뉴스 검색 페이지로 이동
search_query = "삼성전자"
driver.get(f"https://search.naver.com/search.naver?where=news&query={search_query}")

# 페이지 로딩 대기
time.sleep(5)

# 페이지 소스 가져오기
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

# 뉴스 제목과 링크 추출
news_items = soup.select('.news_tit')[:10]  # 첫 10개의 뉴스 항목만 선택

for idx, item in enumerate(news_items, start=1):
    title = item.get_text()  # 뉴스 제목
    link = item['href']  # 뉴스 링크
    print(f"{idx}. {title} - {link}")

# WebDriver 종료
driver.quit()