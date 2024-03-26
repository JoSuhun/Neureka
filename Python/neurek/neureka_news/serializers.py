from rest_framework import serializers


class SummaryArticleSerializer(serializers.Serializer):
    thumbnail_url = serializers.URLField()
    article_title = serializers.CharField(max_length=1024)
    article_link = serializers.URLField()
    article_summary = serializers.CharField()
    press = serializers.CharField(max_length=255)
    date_time = serializers.DateTimeField()
    keywords = serializers.JSONField()


class LinksSerializer(serializers.Serializer):
    links = serializers.ListField(child=serializers.URLField())

class UrlSerializer(serializers.Serializer):
    link = serializers.URLField(max_length=200)

class RateSerializer(serializers.Serializer):
    link = serializers.URLField(max_length=200)
    rating = serializers.IntegerField(min_value=0, max_value=5)