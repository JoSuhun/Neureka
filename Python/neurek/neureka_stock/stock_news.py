import requests
from bs4 import BeautifulSoup
import pprint


def crawling_news(keyword):
    url = ("https://search.naver.com/search.naver?where=news&query=" + keyword +
           "&sm=tab_opt&sort=1&photo=0&field=0&pd=0&ds=&de=&docid=&related=0" +
           "&mynews=0&office_type=0&office_section_code=0&news_office_checked=" +
           "&nso=so%3Add%2Cp%3Aall&is_sug_officeid=0&office_category=0&service_area=0")

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

            news_data = {
                'title': title_element.text.strip() if title_element else None,
                'link': title_element['href'] if title_element else None,
                'press': press_element.text.strip() if press_element else None,
                'summary': summary_element.text.strip() if summary_element else None,
                'thumbnail_url': thumbnail_url
            }

            news_list.append(news_data)

    return news_list



# if __name__ == "__main__":
#     pprint.pprint(crawling_news("삼성전자"))