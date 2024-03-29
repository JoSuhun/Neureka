from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import json

# MongoDB 클라이언트 설정 실서버
client = MongoClient('mongodb+srv://S10P23C105:cKyZzMD36a@ssafy.ngivl.mongodb.net/S10P23C105?authSource=admin')
db = client['S10P23C105']

# MongoDB 로컬 서버
# client = MongoClient('mongodb://localhost:27017/')
# db = client['article_database']

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
                    "$multiply": ["$average_rating", 2]  # 평점에 가중치 2
                }
            }},
            {"$sort": {"weighted_score": -1, "detail_date": -1}},  # weighted_score와 detail_date 모두를 고려하여 정렬
            {"$project": {"_id": 1}},
            {"$limit": 30}  # 상위 30개 문서 선택
        ]

        # 파이프라인 실행 코드
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

        if len(keywords) == 8:
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
        else:
            ids_per_keyword = max(1, 30 // len(keywords))  # 각 키워드별로 추출할 _ids 개수, 최소 1개는 보장
            total = {}

            for keyword in keywords:
                if keyword in result['keywords']:
                    keyword_data = result['keywords'][keyword]
                    for sub_keyword, details in keyword_data.items():
                        if sub_keyword not in total:
                            total[sub_keyword] = {"count": 0, "ids": []}

                        # ids_per_keyword 개수만큼의 _ids를 선택
                        selected_ids = details['_ids'][:ids_per_keyword]

                        total[sub_keyword]['count'] += details['count']
                        total[sub_keyword]['ids'].extend(selected_ids)  # 기존 ids에 추가

                        # 최종적으로 ids 중복 제거
                        total[sub_keyword]['ids'] = list(set(total[sub_keyword]['ids']))

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

    def __init__(self, user_id, ):
        self.client = MongoClient('mongodb+srv://S10P23C105:cKyZzMD36a@ssafy.ngivl.mongodb.net/S10P23C105?authSource=admin')
        self.db = self.client['S10P23C105']
        self.collection = self.db['user']
        self.user_id = user_id

    def read_article(self, user_id, article):
        """기사 읽었을 때 관심도 업데이트"""
        now = datetime.now()

        # 토픽과 신문사에 대한 관심도 업데이트
        update_operations = {
            '$inc': {
                'interests.topics.' + article['topic']: 1,
                'interests.press.' + article['press']: 1
            }
        }

        # 키워드가 리스트 형태로 제공되므로, 각 키워드에 대해 반복 처리
        for keyword in article['keywords']:
            keyword_score_inc_key = 'interests.keywords.' + keyword + '.score'
            keyword_last_read_set_key = 'interests.keywords.' + keyword + '.last_read'

            if '$inc' not in update_operations:
                update_operations['$inc'] = {}
            if '$set' not in update_operations:
                update_operations['$set'] = {}

            update_operations['$inc'][keyword_score_inc_key] = 1
            update_operations['$set'][keyword_last_read_set_key] = now

        self.adjust_interests_based_on_time(user_id)
        # MongoDB 업데이트 연산 실행
        self.collection.update_one({'user_id': user_id}, update_operations, upsert=True)
        # 시간에 따른 관심도 조정 및 오래된 데이터 삭제 로직 추가 필요


    # 관심도 갱신
    @classmethod
    def adjust_interests_based_on_time(self, user_id):
        """시간에 따른 관심도 조정 및 오래된 데이터 삭제"""
        # 사용자의 현재 관심사 데이터를 조회
        user_data = self.collection.find_one({'user_id': user_id})
        if not user_data or 'interests' not in user_data or 'keywords' not in user_data['interests']:
            return  # 관심사 데이터가 없는 경우 처리 종료

        keywords_data = user_data['interests']['keywords']
        now = datetime.now()

        # 키워드 데이터를 마지막 읽은 시간에 따라 내림차순 정렬
        sorted_keywords = sorted(keywords_data.items(), key=lambda item: item[1]['last_read'], reverse=True)

        # 20개 이상의 키워드가 있다면, 그 이후의 키워드에 대해 값 조정
        for keyword, data in sorted_keywords[20:]:
            if data['score'] > 0:
                keywords_data[keyword]['score'] -= 1
            elif data['score'] < 0:
                keywords_data[keyword]['score'] += 1

        # 2달 이상 오래된 키워드 또는 점수가 0인 키워드 삭제
        two_months_ago = now - timedelta(days=60)
        for keyword, data in list(keywords_data.items()):
            if data['last_read'] < two_months_ago or data['score'] == 0:
                del keywords_data[keyword]

        # 수정된 관심사 데이터를 MongoDB에 업데이트
        self.collection.update_one({'user_id': user_id}, {'$set': {'interests.keywords': keywords_data}})

    def recommend_article(self):
        """가장 높은 유사도를 가진 summary article을 추천"""
        user_profile = self.collection.find_one({'user_id': self.user_id})
        if not user_profile or 'interests' not in user_profile:
            return None  # 사용자 프로필이 없거나 관심사 정보가 없는 경우

        # 사용자의 관심사를 기반으로 추출
        user_topics = user_profile['interests'].get('topics', {})
        user_keywords = user_profile['interests'].get('keywords', {}).keys()
        user_presses = user_profile['interests'].get('press', {})

        summary_articles = SummaryArticle.find_all()

        def calculate_jaccard_similarity(set1, set2):
            """자카드 유사도 계산"""
            intersection = len(set1.intersection(set2))
            union = len(set1.union(set2))
            return intersection / union if union else 0

        # 최고의 유사도와 해당 기사 초기화
        highest_similarity = 0
        recommended_article = None

        for article in summary_articles:
            article_set = set([article['topic']] + article['keywords'] + [article['press']])
            user_set = set(user_topics.keys()) | set(user_keywords) | set(user_presses.keys())
            similarity = calculate_jaccard_similarity(article_set, user_set)

            if similarity > highest_similarity:
                highest_similarity = similarity
                recommended_article = article

        return recommended_article

    def calculate_weight(self, user_id, _id, rating):
        """평점에 따른 가중치 계산"""
        # 평점에 따라 가중치 조정 로직 구현
        if rating >= 4:
            return 2
        elif rating == 3:
            return 1
        else:
            return -1