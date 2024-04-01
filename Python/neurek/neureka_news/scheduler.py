from apscheduler.schedulers.background import BlockingScheduler
from neurek.neureka_news.news_headline import load_headline_news
from neurek.neureka_news.news_crawling import for_schedule, crawling
import datetime


def reload_headline():
    print(f'헤드 라인 뉴 스 저 장 실행 : {datetime.datetime.now()}')
    load_headline_news()


def start_crawling():
    print(f'크롤링 실행 : {datetime.datetime.now()}')
    for_schedule(crawling())


def main():
    schedule = BlockingScheduler(timezone='Asia/Seoul')
    schedule.add_job(reload_headline, 'interval', minutes=10, id='headline')
    schedule.add_job(start_crawling, 'interval', minutes=60, id='crawling')

    schedule.start()


if __name__ == "__main__":
    main()