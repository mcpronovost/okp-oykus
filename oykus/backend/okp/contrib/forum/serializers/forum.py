from rest_framework import serializers

from okp.contrib.forum.models import OkpForum
from .category import OkpForumIndexCategorySerializer


class OkpForumIndexSerializer(serializers.ModelSerializer):
    categories = OkpForumIndexCategorySerializer(many=True)

    class Meta:
        model = OkpForum
        fields = ("id", "title", "slug", "categories", "total_posts", "total_topics")

    def get_queryset(self):
        return OkpForum.objects.index()
