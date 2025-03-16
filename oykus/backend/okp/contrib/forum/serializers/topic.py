from rest_framework import serializers

from okp.contrib.forum.models import OkpForumTopic
from .post import OkpForumSectionPostSerializer


class OkpForumSectionTopicSerializer(serializers.ModelSerializer):
    last_post = OkpForumSectionPostSerializer(read_only=True)

    class Meta:
        model = OkpForumTopic
        fields = ("id", "title", "slug", "url", "last_post")

    def get_queryset(self):
        return OkpForumTopic.objects.section()


class OkpForumTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpForumTopic
        fields = ("id", "title", "slug")
