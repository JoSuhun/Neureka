from pymongo import MongoClient
import json

# MongoDB 클라이언트 설정
client = MongoClient('mongodb://localhost:27017/')
db = client['example_database']

if __name__ == '__main__':
    print("?")


class SummaryArticle:
    collection = db['summary_article_collection']

    def __init__(self, thumbnail_url, article_title, article_link, article_summary, press, date_time, keywords):
        self.thumbnail_url = thumbnail_url
        self.article_title = article_title
        self.article_link = article_link
        self.article_summary = article_summary
        self.press = press
        self.date_time = date_time
        self.keywords = json.dumps(keywords)  # JSON 문자열로 변환

    def save(self):
        """문서 저장"""
        document = self.__dict__
        self.collection.insert_one(document)

    @classmethod
    def find_by_title(cls, title):
        """제목으로 문서 조회"""
        return cls.collection.find_one({"article_title": title})

    def set_keywords(self, keywords):
        self.keywords = json.dumps(keywords)

    def get_keywords(self):
        return json.loads(self.keywords)


class DetailsArticle:
    collection = db['details_article_collection']

    def __init__(self, detail_url, detail_title, detail_text):
        self.detail_url = detail_url
        self.detail_title = detail_title
        self.detail_text = detail_text

    def save(self):
        """문서 저장"""
        document = self.__dict__
        self.collection.insert_one(document)

    @classmethod
    def find_by_title(cls, title):
        """제목으로 문서 조회"""
        return cls.collection.find_one({"detail_title": title})
