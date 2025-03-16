from rest_framework import serializers

from okp.contrib.auth.serializers import OkpUserSerializer
from okp.contrib.game.serializers import (
    OkpGameSerializer,
    OkpGameCharacterSerializer,
    OkpGameCharacterAuthorSerializer,
)
from okp.contrib.forum.models import OkpForumPost


class OkpForumSectionPostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OkpForumPost
        fields = ("id", "author", "created_at", "updated_at")
        read_only_fields = ("id", "author", "created_at", "updated_at")

    def get_author(self, obj):
        if obj.user is None and obj.character is None:
            return None
        author = {}
        # if obj.user:
        #     author["user"] = OkpUserSerializer(obj.user).data
        if obj.character:
            author["character"] = OkpGameCharacterAuthorSerializer(obj.character).data
        return author


class OkpForumPostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""

    user = OkpUserSerializer(read_only=True)
    character = OkpGameCharacterSerializer(read_only=True)
    game = OkpGameSerializer(read_only=True)

    class Meta:
        model = OkpForumPost
        fields = (
            "id",
            "game",
            "forum",
            "category",
            "section",
            "topic",
            "user",
            "character",
            "message",
            "is_visible",
            "created_at",
            "updated_at",
        )


class OkpForumPostDetailSerializer(serializers.ModelSerializer):
    """Full serializer for detail views"""

    game = OkpGameSerializer(read_only=True)
    user = OkpUserSerializer(read_only=True)
    character = OkpGameCharacterSerializer(read_only=True)

    class Meta:
        model = OkpForumPost
        fields = (
            "id",
            "game",
            "forum",
            "category",
            "section",
            "topic",
            "user",
            "character",
            "message",
            "is_visible",
            "created_at",
            "updated_at",
        )


class OkpForumPostCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a new forum post"""

    class Meta:
        model = OkpForumPost
        fields = (
            "id",
            "topic",
            "character",
            "message",
        )
        read_only_fields = ("id",)
