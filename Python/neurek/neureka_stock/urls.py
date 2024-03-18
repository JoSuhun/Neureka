from django.urls import path
from .views import fetch_and_save_krx_data

urlpatterns = [
    path('fetch-krx/', fetch_and_save_krx_data, name='fetch_krx_data'),
]