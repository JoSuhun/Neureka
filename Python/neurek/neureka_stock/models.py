from pymongo import MongoClient
import json

# MongoDB 클라이언트 설정
client = MongoClient('mongodb://localhost:27017/')
db = client['article_database']

if __name__ == '__main__':
    print("is neureka stock model")


class DetailsArticle:
    collection = db['details_article_collection']

    def __init__(self, detail_url, detail_title, detail_text, detail_press, detail_date):
        self.detail_url = detail_url
        self.detail_title = detail_title
        self.detail_text = detail_text
        self.detail_press = detail_press
        self.detail_date = detail_date

    def save(self):
        """문서 저장. detail_url이 기존에 없을 경우에만 저장 (업서트 사용)."""
        document = {k: v for k, v in self.__dict__.items() if not k.startswith('_')}
        try:
            # 업서트 옵션을 사용하여 조건에 맞는 문서가 없을 경우에만 새로운 문서를 삽입
            result = self.collection.update_one(
                {"detail_url": self.detail_url},  # 검색 조건
                {"$setOnInsert": document},  # 삽입될 문서
                upsert=True  # 업서트 옵션 활성화
            )
            return result.upserted_id is not None  # 성공 여부
        except Exception as e:
            print(f"Error saving document: {e}")
            return False

    @classmethod
    def find_by_title(cls, title):
        """제목으로 문서 조회"""
        return cls.collection.find_one({"detail_title": title})

    @classmethod
    def find_by_url(cls, url):
        """URL로 문서 조회하며 '_id' 필드 제외"""
        # '_id' 필드를 제외하고 나머지 데이터만 조회
        document = cls.collection.find_one({"detail_url": url}, {'_id': False})
        return document