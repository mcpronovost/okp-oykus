from rest_framework import serializers

from okp.games.models import (
    okpGame,
    okpGameCharacter
)
from okp.forums.models import (
    okpForumCategory,
    okpForumSection,
    okpForumTopic,
    okpForumMessage
)


class okpForumAuthorSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = okpGameCharacter
        fields = [
            "id", "name", "avatar"
        ]

    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return None


class okpForumGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = [
            "id", "name", "slug", "founder", "owner"
        ]


class okpForumLastMessageSerializer(serializers.ModelSerializer):
    author = okpForumAuthorSerializer()
    title = serializers.CharField()

    class Meta:
        model = okpForumMessage
        fields = [
            "id", "author", "title", "created_at"
        ]


class okpForumSectionSerializer(serializers.ModelSerializer):
    last_post = okpForumLastMessageSerializer()

    class Meta:
        model = okpForumSection
        fields = [
            "id",
            "name",
            "description",
            "cover",
            "path",
            "total_messages",
            "last_post"
        ]


class okpForumCategorySerializer(serializers.ModelSerializer):
    game = serializers.SerializerMethodField()
    sections = okpForumSectionSerializer(many=True)

    class Meta:
        model = okpForumCategory
        fields = [
            "id", "name", "description", "path", "breadcrumbs", "game", "sections"
        ]

    def get_game(self, obj):
        game = obj.forum.game
        return okpForumGameSerializer(game).data
