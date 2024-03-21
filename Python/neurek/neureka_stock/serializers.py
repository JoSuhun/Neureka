from rest_framework import serializers


class KeywordSerializer(serializers.Serializer):
    keyword = serializers.CharField(max_length=100)