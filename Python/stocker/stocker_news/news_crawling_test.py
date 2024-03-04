import urllib.request
from selenium import webdriver
from bs4 import BeautifulSoup
import ast

driver = webdriver.Chrome()
driver.get("https://www.selenium.dev/selenium/web/web-form.html")

def getFirstChild(parent, tagName):
    #    print(parent)
    for child in parent.children:
        if (child.name == tagName):
            #            print(child)
            return child

    return None


def getSearchResult(url):
    try:
        driver.get(url)
        response = driver.page_source
    except:
        print("driver.get Error! : " + url)
        return False, None, None, None

    soup = BeautifulSoup(response, "html.parser")

    search_count = 0

    news_contents = soup.find('div', class_="news_contents")
    if news_contents == None:
        print("No <div class=news_contents>")
        return False, None, None, None

    # <a> 태그를 찾습니다.
    news_links = news_contents.find_all('a')
    if len(news_links) == 0:
        print("No <a> tag")
        return False, None, None, None

    news_texts = []
    for news_link in news_links:
        # <a> 태그 안에 있는 텍스트를 가져옵니다.
        news_text = news_link.get_text()
        news_texts.append(news_text)

    # 가져온 텍스트 리스트를 반환합니다.
    return True, news_texts, soup


import sys
import datetime
from tqdm import tqdm

SEARCH_WORD = "삼성전자"
BASE_URL = "https://search.naver.com/search.naver?&where=news&pd=3&query="
DAYS_SEARCH = 1

news_link = []

req_start = 1
err_count = 0
total_result_count = 0

start_dt = datetime.datetime.strptime('2020.01.01', '%Y.%m.%d')
last_dt = datetime.datetime.now() - datetime.timedelta(days=1)

ds = start_dt.strftime('%Y.%m.%d')
de = last_dt.strftime('%Y.%m.%d')

url = BASE_URL + urllib.parse.quote(SEARCH_WORD) + "&start=1&ds=" + ds + "&de=" + de
result = getSearchResult(url)
if not result[0]:
    print("Error getting url : " + url)
    sys.exit()

search_total_count = result[2]
print("search_total_count=" + str(search_total_count))
pbar = tqdm(total=search_total_count)

while True:

    ds = start_dt.strftime('%Y.%m.%d')
    end_dt = min(start_dt + datetime.timedelta(days=DAYS_SEARCH), last_dt)
    de = end_dt.strftime('%Y.%m.%d')

    url = BASE_URL + urllib.parse.quote(SEARCH_WORD) + "&start=" + str(req_start) + "&ds=" + ds + "&de=" + de
    #    print(url)

    result = getSearchResult(url)
    if not result[0]:
        err_count = err_count + 1
        continue

    if (err_count >= 3):  # 3회 이상 오류나면 빠져나간다
        break

    start_idx = result[1]
    if start_idx < req_start:
        if end_dt < last_dt:
            start_dt = end_dt + datetime.timedelta(days=1)
            end_dt = start_dt + datetime.timedelta(days=DAYS_SEARCH)
            req_start = 1
            continue
        else:
            break

    soup = result[3]

    news_lists = []

    page_item_count = 0
    for child in soup.find('ul', class_="type01").children:
        if (child.name == "li"):
            news_lists.append(child)
            page_item_count = page_item_count + 1

    req_start = req_start + page_item_count

    for news in news_lists:
        news_target = getFirstChild(news,
                                    "dl")  # 바로 밑의 <dl> <dt><a>...</a></dt> <dd><span>디지털타임스</span>5일 전<a>네이버뉴스</a></dd> </dl>
        news_target = getFirstChild(news_target, "dd")  # 바로 밑의 <dd>
        news_target = getFirstChild(news_target, "a")  # 바로 밑의 <a> => Naver뉴스 인 경우만 있다
        if news_target != None:
            if "naver" in news_target.attrs['href']:
                news_item_link = news_target.attrs['href']
                news_link.append(news_item_link)

    if pbar is not None:
        #        print("pbar update")
        pbar.update(page_item_count)

if pbar is not None:
    pbar.close()

print(len(news_link))

naver_news_title = []
naver_news_content = []

for n in tqdm(range(len(news_link))):

    ########### 긁어온 URL로 접속하기 ############
    try:
        driver.get(news_link[n])
    #        print(news_link[n])

    except:
        print("Error! getting url=" + news_link[n])
        continue

    try:
        response = driver.page_source

    except Exception:
        driver.switch_to_alert().accept()
        print("게시글이 삭제된 경우입니다.")
        continue

    soup = BeautifulSoup(response, "html.parser")

    ###### 뉴스 타이틀 긁어오기 ######

    title = None

    try:
        item = soup.find('div', class_="article_info")
        title = item.find('h3', class_="tts_head").get_text()
        # print(title)

    except:
        title = "OUTLINK"

    # print(title)
    naver_news_title.append(title)

    ###### 뉴스 본문 긁어오기 ######

    doc = None
    text = ""

    data = soup.find_all("div", {"class": "_article_body_contents"})
    if data:
        for item in data:
            text = text + str(item.find_all(text=True)).strip()
            text = ast.literal_eval(text)
            doc = ' '.join(text)

    else:
        doc = "OUTLINK"
    naver_news_content.append(doc.replace('\n', ' '))

print("Completed!!!")