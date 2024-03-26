from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import news_api, news_bubble, news_keywords_article, news_details

router = DefaultRouter()
router.register(r'base', views.SummaryArticleViewSet, basename='base')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/today/', news_api, name='news_api'),
    path('api/bubble/', news_bubble, name='news_bubble'),
    path('api/keyword_article/', news_keywords_article, name='news_keywords_article'),
    path('api/news_details/', news_details, name='news_details'),
]