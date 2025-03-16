from rest_framework import serializers

from okp.contrib.forum.models import (
    OkpForumSection,
)
from .topic import OkpForumSectionTopicSerializer


class OkpForumIndexSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpForumSection
        fields = ("id", "title", "slug", "url", "flex", "total_posts", "total_topics")

    def get_queryset(self):
        return OkpForumSection.objects.index()


class OkpForumSectionSerializer(serializers.ModelSerializer):
    topics = OkpForumSectionTopicSerializer(many=True)

    class Meta:
        model = OkpForumSection
        fields = ("id", "title", "slug", "url", "flex", "total_posts", "total_topics", "topics")

    def get_queryset(self):
        return OkpForumSection.objects.index()
