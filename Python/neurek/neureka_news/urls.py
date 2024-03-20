from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import news_api
from .views import news_bubble
from .views import news_keywords_article

router = DefaultRouter()
router.register(r'base', views.SummaryArticleViewSet, basename='base')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/today/', news_api, name='news_api'),
    path('api/buble/', news_bubble, name='news_bubble'),
    path('api/keyword_article/', news_keywords_article.as_view(), name='news_keywords_article'),
]