from pymongo import MongoClient
import json

# MongoDB 클라이언트 설정
client = MongoClient('mongodb://localhost:27017/')
db = client['article_database']

if __name__ == '__main__':
    print("is neureka new model")


class SummaryArticle:
    collection = db['summary_article_collection']

    def __init__(self, thumbnail_url, article_title, article_link, article_summary, press, date_time, nouns, topic, keywords):
        self.thumbnail_url = thumbnail_url
        self.article_title = article_title
        self.article_link = article_link
        self.article_summary = article_summary
        self.press = press
        self.date_time = date_time
        self.nouns = nouns
        self.topic=topic
        self.keywords = json.dumps(keywords, ensure_ascii=False)

    def save(self):
        """문서 저장"""
        document = self.__dict__
        self.collection.insert_one(document)

    @classmethod
    def find_all(cls):
        """컬렉션의 모든 문서 조회"""
        documents_cursor = cls.collection.find({}, {'_id': False})
        documents_list = list(documents_cursor)
        # TODO nouns 뺴고 보내 줄지 생각.
        return documents_list

    @classmethod
    def find_by_link(cls, link):
        """링크로 문서 조회"""
        return cls.collection.find_one({"article_link": link})

    @classmethod
    def delete_all(cls):
        # 컬렉션의 모든 문서 삭제
        cls.collection.delete_many({})


    def set_keywords(self, keywords):
        self.keywords = json.dumps(keywords)

    def get_keywords(self):
        return json.loads(self.keywords)


class DetailsArticle:
    collection = db['details_article_collection']

    def __init__(self, detail_url, detail_title, detail_text, detail_press, detail_date, detail_topic):
        self.detail_url = detail_url
        self.detail_title = detail_title
        self.detail_text = detail_text
        self.detail_press = detail_press
        self.detail_date = detail_date
        self.detail_topic = detail_topic

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
    def find_by_url(cls, url):
        """URL로 문서 조회하며 '_id' 필드 제외"""
        # '_id' 필드를 제외하고 나머지 데이터만 조회
        document = cls.collection.find_one({"detail_url": url}, {'_id': False})
        return document


class KeywordArticle:
    collection = db['keyword_article_collection']

    @classmethod
    def save_keywords(cls, keyword_dict):
        """기존 데이터를 삭제하고 새로운 키워드 딕셔너리 저장"""
        # 컬렉션의 모든 문서 삭제
        cls.collection.delete_many({})

        # 새로운 문서 삽입
        document = {"keywords": keyword_dict}
        result = cls.collection.insert_one(document)
        return result.inserted_id

    @classmethod
    def find_by_keywords(cls, keywords):
        """주어진 키워드 리스트에 해당하는 데이터 조회 및 더하기"""
        # MongoDB에서 주어진 키워드 리스트 중 하나라도 포함하는 모든 문서 조회
        # 이 예제에서는 키워드별로 분리된 문서가 아니라 하나의 문서에 모든 키워드가 저장된다고 가정
        result = cls.collection.find_one({})
        if not result or 'keywords' not in result:
            return None

        # 조회된 문서 내에서 주어진 키워드 리스트에 해당하는 값들을 더함
        total = {}
        for keyword in keywords:
            if keyword in result['keywords']:
                # 해당 키워드에 대한 데이터를 더함
                keyword_data = result['keywords'][keyword]
                for sub_keyword, details in keyword_data.items():
                    if sub_keyword in total:
                        # 이미 존재하는 경우, count와 links를 더함
                        total[sub_keyword]['count'] += details['count']
                        total[sub_keyword]['links'] += details['links']  # 중복 링크 제거 필요시 여기서 처리
                    else:
                        # 새로운 경우, 해당 데이터를 추가
                        total[sub_keyword] = details
                        # 링크 중복 제거를 원할 경우 여기에서 처리 가능
                        total[sub_keyword]['links'] = list(set(details['links']))

        return total