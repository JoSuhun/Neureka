import requests
from bs4 import BeautifulSoup, NavigableString, Tag
from .models import DetailsArticle


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

    # date_element가 존재하면 그 내용을 문자열로 변환하여 반환
    if date_element:
        return date_element.get_text(strip=True)
    return None


# 날짜 포메팅 변경
def convert_date_format(input_str):
    from datetime import datetime

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


def crawling_news(keyword):
    url = ("https://search.naver.com/search.naver?where=news&query="+ keyword +
           "&sm=tab_opt&sort=1&photo=0&field=0&pd=0&ds=&de=&docid=&related=0&mynews=0" +
           "&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Add%2Cp%3Aall&is_sug_officeid=0" +
           "&office_category=0&service_area=1")

    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    news_list = []

    for i in range(1, 6):
        news_item = soup.select_one(f'#sp_nws{i}')
        if news_item:
            title_element = news_item.select_one('.news_tit')
            press_element = news_item.select_one('.info.press')
            summary_element = news_item.select_one('.api_txt_lines.dsc_txt_wrap')

            thumbnail_element = news_item.select_one('.dsc_thumb img')
            # 'data-lazysrc' 속성이 있으면 사용하고, 그렇지 않으면 'src' 속성 사용
            thumbnail_url = thumbnail_element.get('data-lazysrc', thumbnail_element.get('src')) if thumbnail_element else None

            newspaper_element = news_item.select_one('#sp_nws1 > div > div > div.news_info > div.info_group > a.info.press > span > img')
            newspaper_url = newspaper_element.get('')

            # info_group 내의 모든 a 태그 찾기
            info_group_links = news_item.select('.info_group a')
            # 두 번째 a 태그의 href 속성 값이 네이버 뉴스 링크임
            naver_news_link = info_group_links[1]['href'] if len(info_group_links) > 1 else None
            title = title_element.text.strip() if title_element else None
            press = press_element.text.strip() if press_element else None
            summary = summary_element.text.strip() if summary_element else None

            # link는 뒤에 카테고리 코드를 떼고 저장
            news_data = {
                'link': naver_news_link[:-8],
                'title': title,
                'press': press,
                'summary': summary,
                'thumbnail_url': thumbnail_url
            }

            detailAticle = DetailsArticle(
                detail_url=naver_news_link[:-8],
                detail_title=title,
                detail_press=press,
                detail_text=extract_content_from_url(naver_news_link),
                detail_date=convert_date_format(date_extraction(naver_news_link))
            )
            detailAticle.save()

            news_list.append(news_data)

    return news_list

def keyword_extraction(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    article_text = soup.find("article").get_text(strip=True)

    return article_text


# import pprint
# if __name__ == "__main__":
#     pprint.pprint(crawling_news("삼성전자"))