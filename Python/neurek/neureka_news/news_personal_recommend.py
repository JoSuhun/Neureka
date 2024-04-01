from neurek.neureka_news.models import UserProfile, DetailsArticle
import time


def read_article_and_update_interests(user_id, article_id):
    """
    사용자가 기사를 읽었을 때 호출되는 함수입니다.
    사용자의 관심도를 업데이트합니다.
    """
    # 해당 기사의 정보를 조회합니다.

    article = DetailsArticle.find_by_id(article_id)

    if article:
        # UserProfile 인스턴스를 생성합니다.
        user_profile = UserProfile(user_id)
        # 기사 정보를 바탕으로 사용자의 관심도를 업데이트합니다.
        user_profile.read_article(user_id, {
            'detail_topic': article.get('detail_topic'),
            'detail_press': article.get('detail_press'),
            'detail_keywords': article.get('detail_keywords')
        })

        print(f"User {user_id}'s interests updated based on article {article_id}.")
        return {"message": "유저가 기사를 읽음으로써, 관심도가 증가했습니다"}
    else:
        print(f"Article {article_id} not found. 기사가 없는데요...")
        message = f"Article {article_id} not found. 기사가 없는데요..."
        return {"message": message}


def recommend_articles_to_user(user_id, topic):
    """
    사용자의 선호도에 기반한 기사를 추천하는 함수입니다.
    """
    # 사용자 조회
    user_profile = UserProfile(user_id)
    # 추천할 기사 목록을 가져옵니다.
    recommended_articles = user_profile.recommend_article(user_id, topic)
    if recommended_articles and not isinstance(recommended_articles, dict):
        print(f"Recommended articles for user {user_id}: {[article['article_title'] for article in recommended_articles]}")
        return recommended_articles
    else:
        print(recommended_articles.get('error') or "No recommendations available.")
        return []


# # 테스트 코드
# if __name__ == '__main__':
#     # 테스트 사용자 ID와 기사 ID
#     test_user_id = '2710yap3'
#     test_article_id = '6607caaf666b59298cefbb02'
#
#    start_time = time.time()
#     # 사용자가 기사를 읽고 관심도를 업데이트하는 시나리오
#     read_article_and_update_interests(test_user_id, test_article_id)
#
#     # 사용자에게 기사를 추천하는 시나리오
#     # 2번째 매개변수에 topic을 리스트로 넣어보세요
#     recommend_articles_to_user("2710yap@gmail.com", [])
#
#    end_time = time.time()  # 종료 시간 저장
#    elapsed_time = end_time - start_time  # 경과 시간 계산
#
#    print(f"Execution time: {elapsed_time} seconds")