import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
import requests
from bs4 import BeautifulSoup, NavigableString, Tag
from neurek.neureka_news.models import DetailsArticle
import time
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor


def extract_article_details(url):
    # 기본 날짜 설정
    formatted_date = datetime.now().strftime('%Y-%m-%d %H:%M')
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")

        # 기사 본문 추출
        article = soup.find("article")
        article_text = article.get_text(strip=True) if article else "No article text found"

        # 이미지 소스 추출
        img_tag = soup.select_one('#img1')
        img_src = img_tag['data-src'] if img_tag and img_tag.get('data-src') else None

        # 날짜 추출
        date_element = soup.select_one('[data-date-time]')
        if date_element:
            date_time_str = date_element['data-date-time']
            date_formats = ['%Y-%m-%dT%H:%M:%S', '%Y-%m-%d %H:%M:%S']
            for fmt in date_formats:
                try:
                    date_time = datetime.strptime(date_time_str, fmt)
                    formatted_date = date_time.strftime('%Y-%m-%d %H:%M')
                    break  # 일치하는 형식을 찾으면 반복 종료
                except ValueError:
                    continue  # 현재 형식이 맞지 않으면 다음 형식으로 시도
    except Exception as e:
        article_text = "No article text found"
        img_src = None
        # formatted_date는 기본값을 유지

    return article_text, img_src, formatted_date

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


def extract_content_from_url(url):
    response = requests.get(url)
    html = response.text

    soup = BeautifulSoup(html, 'html.parser')
    article = soup.find('article', id='dic_area')

    return process_element(article)



def fetch_article_data(link_element):
    # link_element로부터 URL 추출
    link_url = link_element['href'] if link_element else None
    # URL이 유효하면, 기사 상세 정보 추출
    if link_url:
        article_text, thumbnail, article_date = extract_article_details(link_url)
        return link_url, article_text, thumbnail, article_date
    return None, None, None, None

def load_headline_news():
    url = "https://news.naver.com/section/101"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    result_list = []
    list_container = soup.select_one('#newsct > div.section_component.as_section_headline._PERSIST_CONTENT')
    link_elements = [li.find('a', class_='sa_thumb_link') for li in list_container.find_all('li', class_='sa_item _SECTION_HEADLINE')]

    # ThreadPoolExecutor를 사용하여 각 기사의 상세 정보를 병렬로 추출
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_url = {executor.submit(fetch_article_data, link_element): link_element for link_element in link_elements}
        for future in future_to_url:
            link_url, article_text, thumbnail, article_date = future.result()
            if link_url:  # 유효한 URL인 경우 결과 리스트에 추가
                headline_dict = {
                    "headline_url": link_url,
                    "headline_thumbnail_url": thumbnail,
                    "headline_title": "",  # 제목 추출 로직 필요
                    "headline_summary": article_text,  # 본문 전체를 요약으로 사용
                    "headline_press": "",  # 언론사 추출 로직 필요
                    "headline_date": article_date
                }
                result_list.append(headline_dict)

                # 기사 원문에 저장
                detail_article = DetailsArticle(
                    detail_url=link_url,
                    detail_title=title_text,
                    detail_press=press_text,
                    detail_text=extract_content_from_url(link_url),
                    detail_date=article_date,
                    detail_topic="",
                    detail_keywords=""
                )
                detail_article.save()

                # 필요에 따라 DetailsArticle 객체 생성 및 저장 로직 추가

    return result_list

# 테스트
import pprint
if __name__ == "__main__":
    start_time = time.time()
    pprint.pprint(load_headline_news())

    end_time = time.time()  # 종료 시간 저장
    elapsed_time = end_time - start_time  # 경과 시간 계산

    print(f"Execution time: {elapsed_time} seconds")