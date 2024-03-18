from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import news_api
from .views import news_bubble

router = DefaultRouter()
router.register(r'base', views.SummaryArticleViewSet, basename='base')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/today/', news_api, name='news_api'),
    path('api/buble/', news_bubble, name='news_bubble')
]