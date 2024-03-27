import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
import requests
from bs4 import BeautifulSoup, NavigableString, Tag
from neurek.neureka_news.models import DetailsArticle
import time


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

def convert_date_format(input_str):
    from datetime import datetime

    if input_str is None:
        return datetime.now().strftime("%Y-%m-%d %H:%M")

    # '오후'와 '오전'을 AM, PM으로 변환하기 위한 사전 작업
    if "오후" in input_str:
        input_str = input_str.replace("오후", "PM")
    elif "오전" in input_str:
        input_str = input_str.replace("오전", "AM")

    # 입력 문자열을 datetime 객체로 변환
    datetime_obj = datetime.strptime(input_str, "%Y.%m.%d. %p %I:%M")

    # datetime 객체를 원하는 형식의 문자열로 변환
    output_str = datetime_obj.strftime("%Y-%m-%d %H:%M")

    return output_str


def date_extraction(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    date_element = soup.select_one('#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div > span')

    if date_element:
        date_element = soup.select_one('#content > div > div.content > div > div.news_headline > div > span:nth-child(1)')

    # date_element가 존재하면 그 내용을 문자열로 변환하여 반환
    if date_element:
        return date_element.get_text(strip=True)
    return None


def load_headline_news():
    url = "https://news.naver.com/section/101"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    result_list = []
    list_container = soup.select_one('#newsct > div.section_component.as_section_headline._PERSIST_CONTENT')

    if list_container:
        for li in list_container.find_all('li', class_='sa_item _SECTION_HEADLINE'):
            # 각 요소에 대한 정보 추출 및 할당
            link_element = li.find('a', class_='sa_thumb_link')
            img_element = li.find('img', class_='_LAZY_LOADING')
            title_element = li.find('strong', class_='sa_text_strong')
            summary_element = li.find('div', class_='sa_text_lede')
            press_element = li.find('div', class_='sa_text_press')

            # 변수 할당
            link_url = link_element['href'] if link_element else None
            title_text = title_element.text.strip() if title_element else None
            summary_text = summary_element.text.strip() if summary_element else None
            press_text = press_element.text.strip() if press_element else None

            article_date = convert_date_format(date_extraction(link_url))

            # TODO
            # 나는 전문을 보내주고 싶다면 article_text를 summary에
            # 썸네일도 필요없다면 빼주자. (keyword_extraction 도)
            article_text, thumbnail = keyword_extraction(link_url)

            headline_dict = {
                "headline_url": link_url,
                "headline_thumbnail_url": thumbnail,
                "headline_title": title_text,
                "headline_summary": summary_text,
                "headline_press": press_text,
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

    return result_list

# 테스트
import pprint
if __name__ == "__main__":
    pprint.pprint(load_headline_news())