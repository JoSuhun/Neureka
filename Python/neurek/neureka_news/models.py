from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import json

# MongoDB 클라이언트 설정
client = MongoClient('mongodb+srv://S10P23C105:cKyZzMD36a@ssafy.ngivl.mongodb.net/S10P23C105?authSource=admin')
db = client['S10P23C105']

if __name__ == '__main__':
    print("is neureka new model")


class SummaryArticle:
    collection = db['summary_article_collection']

    def __init__(self, _id, thumbnail_url, article_title, article_link,
                 article_summary, press, date_time, nouns, topic, keywords, sentiment):
        self._id = ObjectId(_id)
        self.thumbnail_url = thumbnail_url
        self.article_title = article_title
        self.article_link = article_link
        self.article_summary = article_summary
        self.press = press
        self.date_time = date_time
        self.nouns = nouns
        self.topic = topic
        self.keywords = keywords
        self.sentiment = sentiment

    def save(self):
        """문서 저장 또는 업데이트"""
        document = {k: v for k, v in self.__dict__.items() if not k.startswith('_')}
        self.collection.update_one(
            {'_id': self._id},
            {'$set': document},
            upsert=True
        )

    @classmethod
    def find_all(cls):
        """컬렉션의 모든 문서 조회"""
        documents_cursor = cls.collection.find({})
        documents_list = []
        for doc in documents_cursor:
            # ObjectId를 문자열로 변환하여 '_id' 값을 업데이트
            doc['_id'] = str(doc['_id'])
            documents_list.append(doc)
        return documents_list


    @classmethod
    def find_by_id(cls, _id):
        """_id로 문서 조회"""
        # 문자열 id를 ObjectId로 변환
        object_id = ObjectId(_id)
        return cls.collection.find_one({"_id": object_id})


    @classmethod
    def delete_all(cls):
        # 컬렉션의 모든 문서 삭제
        cls.collection.delete_many({})

    @classmethod
    def trim_collection(cls, max_docs=2000):
        """
        컬렉션의 문서 개수가 max_docs를 초과하는 경우,
        가장 오래된 문서부터 초과분을 삭제합니다.
        """
        # 현재 컬렉션의 문서 개수 확인
        current_count = cls.collection.count_documents({})
        excess = current_count - max_docs

        if excess > 0:
            # 가장 오래된 문서부터 삭제할 개수만큼 삭제
            # date_time 필드를 기준으로 오름차순 정렬하여 가장 오래된 문서를 찾음
            delete_result = cls.collection.find().sort('date_time', 1).limit(excess)
            ids_to_delete = [doc['_id'] for doc in delete_result]

            # 해당 _id를 가진 문서들 삭제
            cls.collection.delete_many({'_id': {'$in': ids_to_delete}})

            return True, f"{excess} documents were deleted."
        else:
            return False, "No documents were deleted. Collection does not exceed the max_docs limit."

    def set_keywords(self, keywords):
        self.keywords = json.dumps(keywords)

    def get_keywords(self):
        return json.loads(self.keywords)


class DetailsArticle:
    collection = db['details_article_collection']

    def __init__(self, detail_url, detail_title, detail_text, detail_press, detail_date,
                 detail_topic, detail_keywords):
        self.detail_url = detail_url
        self.detail_title = detail_title
        self.detail_text = detail_text
        self.detail_press = detail_press
        self.detail_date = detail_date
        self.detail_topic = detail_topic
        self.detail_keywords = detail_keywords


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
        document = cls.collection.find_one({"detail_url": url})
        return document

    @classmethod
    def find_by_id(cls, _id):
        """_id로 문서 조회"""
        document = cls.collection.find_one({'_id': ObjectId(_id)})
        if document:
            document['_id'] = str(document['_id'])  # ObjectId를 문자열로 변환
        return document

    @classmethod
    def update_rating(cls, _id, user_rating):
        """_id에 해당하는 문서의 평점 업데이트"""
        document = cls.collection.find_one({"_id": ObjectId(_id)})

        if document:
            new_rate = document.get('detail_rate', 0) + user_rating
            new_rate_count = document.get('detail_rate_count', 0) + 1
            update_result = cls.collection.update_one(
                {"_id": ObjectId(_id)},
                {"$set": {"detail_rate": new_rate, "detail_rate_count": new_rate_count}}
            )
            return update_result.modified_count > 0
        else:
            return False

    @classmethod
    def find_urls_by_keywords_sorted_by_average_rating(cls, keywords):
        """주어진 키워드를 포함하고, 평균 점수로 정렬한 후, 상위 30개의 _id만 추출하여 반환"""

        # 현재 날짜로부터 7일 전의 날짜를 계산
        seven_days_ago = datetime.now() - timedelta(days=7)
        pipeline = [
            {"$match": {
                "detail_keywords": {"$in": keywords},
                "detail_date": {"$gte": seven_days_ago.strftime('%Y-%m-%d %H:%M')}
            }},
            {"$addFields": {
                "weighted_score": {
                    "$multiply": ["$average_rating", 1]  # 평점에 가중치 1
                }
            }},
            {"$sort": {"weighted_score": -1, "detail_date": -1}},  # weighted_score와 detail_date 모두를 고려하여 정렬
            {"$project": {"_id": 1}},
            {"$limit": 30}  # 상위 30개 문서 선택
        ]

        # 이 파이프라인을 실행하는 코드 예시
        docs = cls.collection.aggregate(pipeline)

        # 조회 결과에서 _id만 추출하여 리스트로 변환하여 반환
        ids = [str(doc['_id']) for doc in docs]

        return ids

    @classmethod
    def is_topic_empty_for_url(cls, detail_url):
        """주어진 detail_url에 해당하는 문서의 detail_topic이 빈 문자열인지 확인"""
        document = cls.collection.find_one({"detail_url": detail_url})
        if document:
            # 문서를 찾았고, detail_topic 필드가 존재하며 빈 문자열인 경우 True 반환
            if document.get("detail_topic") == "":
                return True
        # 문서를 찾지 못하거나 detail_topic 필드가 존재하지 않는 경우 False 반환
        return False

    @classmethod
    def is_topic_empty_for_id(cls, _id):
        """주어진 _id에 해당하는 문서의 detail_topic이 빈 문자열인지 확인"""
        document = cls.collection.find_one({"_id": ObjectId(_id)})
        return document and document.get("detail_topic") == ""

    @classmethod
    def update_topic_and_keywords(cls, _id, new_detail_topic, new_detail_keywords):
        """주어진 _id에 해당하는 문서의 detail_topic과 detail_keywords를 업데이트"""
        update_result = cls.collection.update_one(
            {"_id": ObjectId(_id)},
            {"$set": {"detail_topic": new_detail_topic, "detail_keywords": new_detail_keywords}}
        )
        return update_result.modified_count > 0


class KeywordArticle:
    collection = db['keyword_article_collection']

    @classmethod
    def save_keywords(cls, keyword_dict):
        """기존 데이터를 삭제하고 새로운 키워드 딕셔너리 저장"""
        # 컬렉션의 모든 문서 삭제
        cls.collection.delete_many({})
        document = {"keywords": keyword_dict}
        result = cls.collection.insert_one(document)
        return result.inserted_id

    @classmethod
    def find_by_keywords(cls, keywords):
        """주어진 키워드 리스트에 해당하는 데이터 조회 및 더하기"""
        result = cls.collection.find_one({})
        if not result or 'keywords' not in result:
            return None

        total = {}
        for keyword in keywords:
            if keyword in result['keywords']:
                keyword_data = result['keywords'][keyword]
                for sub_keyword, details in keyword_data.items():
                    if sub_keyword not in total:
                        total[sub_keyword] = {"count": 0, "ids": []}
                    total[sub_keyword]['count'] += details['count']

                    # 중복 제거 처리
                    total[sub_keyword]['ids'] = list(set(total[sub_keyword]['ids'] + details['_ids']))

        return total


class HeadlineNews:
    collection = db['headlines']

    def __init__(self, _id, headline_url, headline_thumbnail_url,
                 headline_title, headline_press, headline_date):
        self._id = _id
        self.headline_url = headline_url
        self.headline_thumbnail_url = headline_thumbnail_url
        self.headline_title = headline_title
        self.headline_press = headline_press
        self.headline_date = headline_date

    @classmethod
    def save(self):
        """문서 저장. _id가 제공되지 않은 경우에만 새로운 문서로 삽입"""
        if not self._id:  # _id가 없는 경우, 새 문서로 취급
            document = {k: v for k, v in self.__dict__.items() if v is not None and not k.startswith('_')}
            result = self.collection.insert_one(document)
            self._id = str(result.inserted_id)  # 삽입된 문서의 ObjectId를 문자열로 변환하여 저장
        else:  # _id가 있는 경우, 해당 _id를 가진 문서를 업데이트
            self.collection.update_one(
                {'_id': ObjectId(self._id)},  # ObjectId로 변환
                {'$set': {k: v for k, v in self.__dict__.items() if v is not None and not k.startswith('_')}},
                upsert=True
            )

    @classmethod
    def delete_all(cls):
        cls.collection.delete_many({})

    @classmethod
    def find_all(cls):
        """컬렉션의 모든 문서 조회"""
        documents_cursor = cls.collection.find({})
        documents_list = list(documents_cursor)
        for document in documents_list:
            # ObjectId를 문자열로 변환
            document['_id'] = str(document['_id'])
        return documents_list

class UserProfile:
    collection = db['user']

    def __init__(self, user_id, interests):
        self.user_id = user_id
        self.interests = interests

    @classmethod
    def update_interests(cls, user_id, keywords, review=False):
        """사용자의 관심사를 업데이트합니다."""
        score_increment = 10 if review else 1  # 리뷰를 남겼을 경우 더 큰 가중치 부여
        user_profile = cls.collection.find_one({'user_id': user_id})

        if not user_profile:
            # 사용자 프로필이 없으면 새로 생성
            user_profile = {'user_id': user_id, 'interests': {}}

        for keyword in keywords:
            # 기존 점수에 추가
            if keyword in user_profile['interests']:
                user_profile['interests'][keyword] += score_increment
            else:
                user_profile['interests'][keyword] = score_increment

        cls.collection.update_one({'user_id': user_id}, {'$set': user_profile}, upsert=True)

    @classmethod
    def article_read(request, user_id, article_id):
        """기사 읽기 요청 처리"""
        # 이 함수는 실제로 기사의 키워드를 조회하는 로직을 포함해야 합니다.
        # 예시에서는 article_id를 사용하여 기사의 키워드를 조회하는 대신, 키워드 목록을 직접 정의합니다.
        keywords = ['keyword1', 'keyword2']
        update_interests(user_id, keywords)
        return JsonResponse({'message': 'User interests updated.'})

    @classmethod
    def article_reviewed(request, user_id, article_id):
        """기사 리뷰 요청 처리"""
        # 실제로 기사의 키워드를 조회하는 로직을 포함해야 합니다.
        keywords = ['keyword1', 'keyword2']
        update_interests(user_id, keywords, review=True)
        return JsonResponse({'message': 'User interests updated with higher weight for review.'})