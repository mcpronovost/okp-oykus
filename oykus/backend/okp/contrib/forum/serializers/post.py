from rest_framework import serializers

from okp.contrib.auth.serializers import OkpUserSerializer
from okp.contrib.game.serializers import (
    OkpGameSerializer,
    OkpGameCharacterSerializer,
)
from okp.contrib.forum.models import OkpForumPost


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
