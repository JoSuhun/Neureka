from neurek.neureka_news.models import SummaryArticle
import json
from tqdm import tqdm
import os


current_directory = os.path.dirname(__file__)
file_path = os.path.join(current_directory, 'news_data.json')
with open(file_path, 'r', encoding='utf-8') as file:
    article_list = json.load(file)


for article in tqdm(article_list):
    article_data = SummaryArticle(
        thumbnail_url=article.get('thumbnail_url'),
        article_title= article.get('article_title'),
        article_link=article.get('article_link'),
        article_summary=article.get('article_summary'),
        press=article.get('press'),
        date_time=article.get('date_time'),
        keywords=article.get('keywords')
    )

    article_data.save()


# 저장된 데이터 조회
# saved_article = SummaryArticle.find_by_title("")
