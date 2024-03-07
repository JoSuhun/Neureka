import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup


from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# # 주어진 딕셔너리
# company_articles = {
#     "Company A": [0, 1, 2],
#     "Company B": [3, 4],
#     "Company C": [5, 6, 7]
# }
#
# # 문장들이 담긴 크롤링 기사 배열
# articles = [
#     "This is the first document.",
#     "This document is the second document.",
#     "And this is the third one.",
#     "Is this the first document?",
#     "Some other document here.",
#     "Another document for Company C.",
#     "Document for Company C with some additional information.",
#     "Document for Company C with more information."
# ]
#
# # TF-IDF 변환기 생성
# tfidf_vectorizer = TfidfVectorizer()
#
# def calculate_tfidf(company_articles, articles):
#     company_tfidf_scores = {}
#     for company, article_indices in company_articles.items():
#         # 해당 기업의 모든 기사 문장들을 가져와서 합침
#         company_articles_text = [articles[idx] for idx in article_indices]
#         # TF-IDF 계산
#         tfidf_matrix = tfidf_vectorizer.fit_transform(company_articles_text)
#         # TF-IDF 점수 합산
#         tfidf_scores = np.asarray(tfidf_matrix.mean(axis=0)).ravel()
#         # 문장들의 TF-IDF 점수와 인덱스를 매핑하여 저장
#         scores_indices = [(score, idx) for idx, score in enumerate(tfidf_scores)]
#         # TF-IDF 점수가 높은 순으로 정렬
#         sorted_scores_indices = sorted(scores_indices, key=lambda x: x[0], reverse=True)
#         # 해당 기업에 대한 TF-IDF 점수와 인덱스를 저장
#         company_tfidf_scores[company] = sorted_scores_indices
#     return company_tfidf_scores
#
# # TF-IDF 계산
# company_tfidf_scores = calculate_tfidf(company_articles, articles)
#
# # 결과 출력
# for company, scores_indices in company_tfidf_scores.items():
#     print(f"Company: {company}")
#     for score, idx in scores_indices:
#         print(f"Article Index: {idx}, TF-IDF Score: {score}")
#     print()


# WebDriver 설정

companies = [
    "삼성전자", "SK하이닉스", "LG에너지솔루션", "삼성바이오로직스", "현대차",
    "POSCO홀딩스", "NAVER", "기아", "LG화학", "삼성SDI",
    "포스코퓨처엠", "셀트리온", "카카오", "삼성물산", "KB금융",
    "현대모비스", "신한지주", "LG전자", "삼성생명", "SK이노베이션",
    "LG", "SK", "카카오뱅크", "삼성에스디에스", "하나금융지주",
    "한국전력", "삼성화재", "KT&G", "메리츠금융지주", "에코프로머티",
    "삼성전기", "HD현대중공업", "SK텔레콤", "HMM", "고려아연",
    "포스코인터내셔널", "두산에너빌리티", "크래프톤", "하이브", "우리금융지주",
    "기업은행", "KT", "대한항공", "한화오션", "HD한국조선해양",
    "아모레퍼시픽", "S-Oil", "SK바이오팜", "SK스퀘어", "삼성중공업",
    "롯데케미칼", "현대글로비스", "금양", "카카오페이", "한화에어로스페이스",
    "SK아이이테크놀로지", "한화솔루션", "DB손해보험", "LG이노텍", "LG생활건강",
    "한국타이어앤테크놀로지", "SK바이오사이언스", "삼성엔지니어링", "엔씨소프트", "유한양행",
    "HD현대", "CJ제일제당", "두산밥캣", "LG디스플레이", "넷마블",
    "한국항공우주", "현대제철", "미래에셋증권", "LG유플러스", "오리온",
    "한미약품", "코웨이", "한진칼", "현대건설", "GS",
    "금호석유", "삼성카드", "한온시스템", "삼성증권", "한국금융지주",
    "강원랜드", "SKC", "NH투자증권", "F&F", "현대미포조선",
    "한화시스템", "HD현대일렉트릭", "롯데지주", "쌍용C&E", "LS",
    "현대로템", "LIG넥스원", "현대해상", "CJ", "DB하이텍",
    "CJ대한통운", "씨에스윈드", "호텔신라", "키움증권", "한미사이언스",
    "GS리테일", "한전기술", "농심", "한솔케미칼", "아모레G",
    "팬오션", "한국가스공사", "에스원", "BGF리테일", "한화생명",
    "제일기획", "휠라홀딩스", "BNK금융지주", "롯데쇼핑", "LS ELECTRIC",
    "JB금융지주", "이마트", "영원무역", "KCC", "OCI홀딩스",
    "롯데에너지머티리얼즈", "한화", "대우건설", "동서", "현대엘리베이", "한올바이오파마",
    "신세계", "삼아알미늄", "현대위아", "HL만도", "효성첨단소재",
    "효성티앤씨", "하이트진로", "한전KPS", "KG모빌리티", "삼양식품",
    "종근당", "오뚜기", "HD현대인프라코어", "에스엘", "롯데정밀화학",
    "금호타이어", "한국앤컴퍼니", "두산", "두산퓨얼셀", "에스디바이오센서",
    "DL이앤씨", "TCC스틸", "효성", "녹십자", "DGB금융지주",
    "롯데칠성", "코스모화학", "코스맥스", "GS건설", "SK네트웍스",
    "덴티움", "대웅제약", "대한전선", "한샘", "한국콜마",
    "현대백화점", "롯데웰푸드", "코오롱인더", "SK케미칼", "LX인터내셔널",
    "후성", "영원무역홀딩스", "풍산", "대웅", "DL",
    "대한유화", "동원시스템즈", "명신산업", "세아베스틸지주", "오리온홀딩스",
    "영풍", "TKG휴켐스", "PI첨단소재", "한일시멘트", "아이에스동서",
    "한세실업", "일진하이솔루스", "더블유게임즈", "하나투어", "GKL",
    "KG스틸", "아시아나항공", "세방전지", "율촌화학", "롯데관광개발",
    "대상", "녹십자홀딩스", "신풍제약", "신세계인터내셔날"
]



# 더보기 버튼을 계속 누르면서 페이지 로드
# while True:
#     try:
#         if (crawling_count == 20): break
#         more_button = WebDriverWait(driver, 3).until(
#             EC.presence_of_element_located((By.CSS_SELECTOR, "a._CONTENT_LIST_LOAD_MORE_BUTTON"))
#         )
#         more_button.click()
#         crawling_count += 1
#         time.sleep(1)  # 버튼 클릭 후 잠시 대기
#     except TimeoutException as e:
#         # TimeoutException이 발생하면 더 이상 더보기 버튼이 없는 것으로 판단하고 종료
#         print("TimeoutException 발생:", e)
#         break

# 페이지 소스 가져오기

driver = webdriver.Chrome()
# Category_code = 101
# BASE_URL = "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=" + str(Category_code)
BASE_URL = "https://finance.naver.com/news/news_list.naver?mode=LSS2D&section_id=101&section_id2=258&page="
article_list = []

# 마지막 페이지 설정
max_page = 5

# 첫 번째 페이지부터 시작하여 마지막 페이지까지 크롤링합니다.
current_page = 1
while current_page <= max_page:
    # 페이지마다 URL을 생성합니다.
    url = BASE_URL + str(current_page)
    driver.get(url)
    time.sleep(2)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    # 각 뉴스 항목을 나타내는 요소들을 선택합니다.
    news_items = soup.select('#contentarea_left > ul > li.newsList > dl')

    # 페이지의 뉴스 항목을 크롤링합니다.
    for idx, item in enumerate(news_items, start=1):
        article_dict = {}

        # Thumbnail URL 가져오기
        thumbnail_tag = item.find('dt', class_='thumb')
        article_dict['thumbnail_url'] = thumbnail_tag.find('img')['src'] if thumbnail_tag and thumbnail_tag.find(
            'img') else None

        # 기사 제목과 링크 가져오기
        article_subject = item.find('dt', class_='articleSubject')
        article_dict['article_title'] = article_subject.find('a').text.strip() if article_subject else None
        article_dict['article_link'] = article_subject.find('a')['href'] if article_subject else None

        # 기사 요약, 언론사, 날짜 및 시간 가져오기
        article_summary = item.find('dd', class_='articleSummary')
        article_dict['article_summary'] = article_summary.text.strip() if article_summary else None
        article_dict['press'] = article_summary.find('span', class_='press').text if article_summary else None
        article_dict['date_time'] = article_summary.find('span', class_='wdate').text if article_summary else None

        article_list.append(article_dict)

    # 다음 페이지로 이동합니다.
    current_page += 1

print(article_list)

print(article_list)

for idx, article in enumerate(article_list, start=1):
    print(f"Article {idx}:")
    print(f"Thumbnail URL: {article.get('thumbnail_url', 'N/A')}")
    print(f"Title: {article.get('article_title', 'N/A')}")
    print(f"Link: {article.get('article_link', 'N/A')}")
    print(f"Summary: {article.get('article_summary', 'N/A')}")
    print(f"Press: {article.get('press', 'N/A')}")
    print(f"Date & Time: {article.get('date_time', 'N/A')}")
    print()


# for idx, item in enumerate(news_items, start=1):
#     title = item.get_text()  # 뉴스 제목
#     link = item['href']  # 뉴스 링크
#     print(f"{idx}. {title} - {link}")

# WebDriver 종료
driver.quit()