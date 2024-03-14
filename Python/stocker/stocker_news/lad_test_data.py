from selenium import webdriver
from bs4 import BeautifulSoup
import time
import json
import os
from tqdm import tqdm


article_list = []
def keyword_extraction(url):
    # 기사 리스트 속 기사
    driver2 = webdriver.Chrome()
    driver2.get(url)
    time.sleep(0.2)
    html_content = driver2.page_source
    beautiful_soup = BeautifulSoup(html_content, "html.parser")
    article_text = beautiful_soup.find("article").get_text(strip=True)

    article_list.append(article_text)


current_directory = os.path.dirname(__file__)
file_path = os.path.join(current_directory, 'news_data.json')

# 기사 데이터
with open(file_path, 'r', encoding='utf-8') as file:
    news_data = json.load(file)


for i in tqdm(range(len(news_data))):
    keyword_extraction(news_data[i]["article_link"])

with open('lda_test_data.json', 'w', encoding='utf-8') as file:
    json.dump(article_list, file, ensure_ascii=False, indent=4)
