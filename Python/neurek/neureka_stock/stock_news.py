import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
from bs4 import BeautifulSoup, NavigableString, Tag
import time
from neurek.neureka_news.models import DetailsArticle, SummaryArticle
from neurek.neureka_news.LDA.keyword_for_lda import text_through_LDA_probability

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


# 해당 페이지에서 날짜만 불러오는 코드
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


def keyword_extraction(url):
    response = requests.get(url)
    time.sleep(0.1)  # 서버에 과부하를 주지 않기 위해 잠시 대기
    soup = BeautifulSoup(response.content, "html.parser")

    # `soup.find("article")`의 결과가 None인 경우를 처리
    article = soup.find("article")
    if article:
        article_text = article.get_text(strip=True)
        # article_text가 있는 경우에만 이미지 태그를 찾음
        img_tag = soup.select_one('#img1')
        img_src = img_tag['data-src'] if img_tag and img_tag.get('data-src') else None
    else:
        # article_text가 없는 경우, img_src도 None으로 설정
        article_text = "No article text found"
        img_src = None

    return article_text, img_src

# 날짜 포메팅 변경
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


# 개별 뉴스 항목 처리를 위한 함수
def process_news_item(i, soup):
    news_item = soup.select_one(f'#sp_nws{i}')
    if news_item:
        title_element = news_item.select_one('.news_tit')
        press_element = news_item.select_one('.info.press')
        summary_element = news_item.select_one('.api_txt_lines.dsc_txt_wrap')

        info_group_links = news_item.select('.info_group a')
        naver_news_link = info_group_links[1]['href'] if len(info_group_links) > 1 else None
        title = title_element.text.strip() if title_element else None
        press = press_element.text.strip() if press_element else None
        summary = summary_element.text.strip() if summary_element else None

        # 다른 함수 호출 및 처리
        text, thumbnail_url = keyword_extraction(naver_news_link)
        # topic = text_through_LDA_probability(text)
        article_date = convert_date_format(date_extraction(naver_news_link))


        news_data = {
            'link': naver_news_link[:-8],
            'title': title,
            'press': press,
            'summary': summary,
            'thumbnail_url': thumbnail_url,
            'article_date': article_date
        }

        detail_article = DetailsArticle(
            detail_url=naver_news_link[:-8],
            detail_title=title,
            detail_press=press,
            detail_text=extract_content_from_url(naver_news_link),
            detail_date=article_date,
            detail_topic="",
            detail_keywords=""
        )
        detail_article.save()

        return news_data
    else:
        # news_item이 없을 경우의 예외 처리
        return {"error": "일시적인 오류입니다"}


def crawling_news(keyword):
    url = (f"https://search.naver.com/search.naver?where=news&query={keyword}"
           "&sm=tab_opt&sort=1&photo=0&field=0&pd=0&ds=&de=&docid=&related=0&mynews=0"
           "&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Add%2Cp%3Aall&is_sug_officeid=0"
           "&office_category=0&service_area=1")

    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    news_list = []
    # ThreadPoolExecutor를 사용하여 병렬 처리
    with ThreadPoolExecutor(max_workers=10) as executor:
        # 각 뉴스 항목에 대한 작업 생성
        futures = [executor.submit(process_news_item, i, soup) for i in range(1, 6)]
        for future in as_completed(futures):
            news_data = future.result()
            if news_data:
                news_list.append(news_data)

    return news_list


# # 확인용
# import pprint
# if __name__ == "__main__":
#     start_time = time.time()
#
#     pprint.pprint(crawling_news("스포츠"))
#
#     end_time = time.time()  # 종료 시간 저장
#     elapsed_time = end_time - start_time  # 경과 시간 계산
#
#     print(f"Execution time: {elapsed_time} seconds")