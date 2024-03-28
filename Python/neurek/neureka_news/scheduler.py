from apscheduler.schedulers.background import BlockingScheduler
from neurek.neureka_news.news_headline import load_headline_news
from neurek.neureka_news.news_crawling import for_schedule

def reload_headline():
    print('헤드 라인 뉴 스 저 장 실행 ')
    load_headline_news()

def start_crawling():
    print('크롤링 실행')
    for_schedule()

def main():
    schedule = BlockingScheduler()
    schedule.add_job(reload_headline,'interval', minutes=10, id='headline')
    schedule.add_job(start_crawling, 'cron', hour=9, id='crawling')

    schedule.start()

if __name__ == "__main__":
    main()