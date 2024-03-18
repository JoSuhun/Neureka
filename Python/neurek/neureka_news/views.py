from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from .serializers import SummaryArticleSerializer
import json
from django.http import HttpResponse
import os
from django.conf import settings
from .models import db


class SummaryArticleViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SummaryArticleSerializer

    def get_queryset(self):
        """MongoDB에서 데이터를 조회하는 커스텀 메서드"""
        # 이 메서드는 DRF의 기대에 따라 존재해야 하지만,
        # 실제로 MongoDB 쿼리 결과를 직접 반환하는 용도로 사용됩니다.
        # 이 메서드의 존재는 DRF의 오류 메시지를 방지하기 위한 것입니다.
        return None

    def list(self, request, *args, **kwargs):
        queryset = list(db['summary_article_collection'].find({}))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


def load_news_data():
    file_path = os.path.join(settings.BASE_DIR, 'neureka_news', 'news_data.json')
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
    news_data = load_news_data()
    keyword_frequency = {}

    for article in news_data:
        for keyword in article.get("keyword", []):
            keyword_frequency[keyword] = keyword_frequency.get(keyword, 0) + 1

    return HttpResponse(json.dumps(keyword_frequency, ensure_ascii=False, indent=4),
                        content_type="application/json; charset=utf-8")
