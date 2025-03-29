from rest_framework import serializers

from okp.contrib.auth.serializers import (
    OkpUserSerializer,
    OkpGameUserAuthorSerializer,
)
from okp.contrib.game.serializers import (
    OkpGameSerializer,
    OkpGameCharacterAuthorSerializer,
)
from okp.contrib.forum.models import OkpForumPost


class OkpForumCategoryPostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)
    topic = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OkpForumPost
        fields = ("id", "topic", "author", "created_at", "updated_at")
        read_only_fields = ("id", "topic", "author", "created_at", "updated_at")

    def get_topic(self, obj):
        return {
            "id": obj.topic.id,
            "title": obj.topic.title,
            "slug": obj.topic.slug,
            "url": obj.topic.url,
        }

    def get_author(self, obj):
        if obj.character is None:
            return None
        author = {}
        if obj.character:
            author["character"] = OkpGameCharacterAuthorSerializer(
                obj.character
            ).data
        return author


class OkpForumSectionPostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OkpForumPost
        fields = ("id", "author", "created_at", "updated_at")
        read_only_fields = ("id", "author", "created_at", "updated_at")

    def get_author(self, obj):
        if obj.character is None:
            return None
        author = {}
        if obj.character:
            author["character"] = OkpGameCharacterAuthorSerializer(
                obj.character
            ).data
        return author


class OkpForumTopicPostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OkpForumPost
        fields = ("id", "author", "message", "created_at", "updated_at")
        read_only_fields = (
            "id",
            "author",
            "message",
            "created_at",
            "updated_at",
        )

    def get_author(self, obj):
        if obj.user is None and obj.character is None:
            return None
        author = {}
        if obj.user:
            author["user"] = OkpGameUserAuthorSerializer(obj.user).data
        if obj.character:
            author["character"] = OkpGameCharacterAuthorSerializer(
                obj.character
            ).data
        return author


class OkpForumPostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""

    user = OkpUserSerializer(read_only=True)
    character = OkpGameCharacterAuthorSerializer(read_only=True)
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
    character = OkpGameCharacterAuthorSerializer(read_only=True)

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

    def create(self, validated_data):
        # Add the current user to the validated data
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

    def validate(self, data):
        request = self.context.get("request")
        character = data.get("character")
        topic = data.get("topic")

        # Topic validations
        if not topic:
            raise serializers.ValidationError({"topic": "Topic does not exist."})
        if topic.is_locked:
            raise serializers.ValidationError({"topic": "Cannot create posts in a locked topic."})

        # Character validations
        if not character:
            raise serializers.ValidationError({"character": "Character does not exist."})
        if not character.is_active:
            raise serializers.ValidationError({"character": "Character is not active."})

        # Character ownership and game validations
        if character.user != request.user:
            raise serializers.ValidationError({"character": "Character does not belong to you."})
        if character.game.id != topic.game.id:
            raise serializers.ValidationError({"character": "Character does not belong to this game."})

        return data


class OkpForumPostDeleteSerializer(serializers.ModelSerializer):
    """Serializer for deleting a forum post"""

    class Meta:
        model = OkpForumPost
        fields = ("id",)
        read_only_fields = ("id",)

    def validate(self, data):
        request = self.context.get("request")
        post = self.get_object()

        if not post:
            raise serializers.ValidationError({"post": "Post does not exist."})
        if post.user != request.user:
            raise serializers.ValidationError({"post": "Post does not belong to you."})

        return data
