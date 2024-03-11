from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer
import json
from django.http import HttpResponse
import os
from django.conf import settings

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

def load_news_data():
    file_path = os.path.join(settings.BASE_DIR, 'stocker_news', 'news_data.json')
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    return data

# 뉴스 요약 정보 전체 전송
def news_api(request):
    news_data = load_news_data()
    return HttpResponse(json.dumps(news_data, ensure_ascii=False, indent=4),
                        content_type="application/json; charset=utf-8")

# 뉴스들의 키워드 개수 전체 전송
def news_bubble(request):
    news_data = load_news_data()  # 이 함수는 당신의 뉴스 데이터를 로드합니다.
    keyword_frequency = {}

    for article in news_data:
        for keyword in article.get("keyword", []):
            keyword_frequency[keyword] = keyword_frequency.get(keyword, 0) + 1

    return HttpResponse(json.dumps(keyword_frequency, ensure_ascii=False, indent=4),
                        content_type="application/json; charset=utf-8")
