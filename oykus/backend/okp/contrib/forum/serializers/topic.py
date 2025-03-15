from rest_framework import serializers

from okp.contrib.forum.serializers.post import OkpForumPostListSerializer
from okp.contrib.forum.models import OkpForumTopic


class OkpForumTopicSerializer(serializers.ModelSerializer):
    posts = OkpForumPostListSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = OkpForumTopic
        fields = ["id", "title", "posts"]
