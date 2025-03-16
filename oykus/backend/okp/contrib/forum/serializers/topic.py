from rest_framework import serializers

from okp.contrib.game.serializers import OkpGameCharacterAuthorSerializer
from okp.contrib.forum.models import OkpForumTopic
from .post import OkpForumSectionPostSerializer


class OkpForumSectionTopicSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)
    last_post = OkpForumSectionPostSerializer(read_only=True)

    class Meta:
        model = OkpForumTopic
        fields = ("id", "title", "slug", "url", "author", "total_posts", "last_post")
        read_only_fields = ("id", "title", "slug", "url", "author", "total_posts", "last_post")

    def get_queryset(self):
        return OkpForumTopic.objects.section()

    def get_author(self, obj):
        if obj.user is None and obj.character is None:
            return None
        author = {}
        # if obj.user:
        #     author["user"] = OkpUserSerializer(obj.user).data
        if obj.character:
            author["character"] = OkpGameCharacterAuthorSerializer(obj.character).data
        return author


class OkpForumTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpForumTopic
        fields = ("id", "title", "slug")
