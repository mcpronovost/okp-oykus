from rest_framework import serializers

from okp.contrib.forum.models import OkpForumCategory
from .section import OkpForumIndexSectionSerializer


class OkpForumIndexCategorySerializer(serializers.ModelSerializer):
    sections = OkpForumIndexSectionSerializer(many=True)

    class Meta:
        model = OkpForumCategory
        fields = ("id", "title", "slug", "url", "sections", "total_posts", "total_topics")

    def get_queryset(self):
        return OkpForumCategory.objects.index()


class OkpForumCategorySerializer(serializers.ModelSerializer):
    sections = OkpForumIndexSectionSerializer(many=True)

    class Meta:
        model = OkpForumCategory
        fields = ("id", "title", "slug", "url", "sections", "total_posts", "total_topics")

    def get_queryset(self):
        return OkpForumCategory.objects.index()
