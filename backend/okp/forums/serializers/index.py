from rest_framework import serializers

from okp.games.models import (
    okpGame
)
from okp.forums.models import (
    okpForum,
    okpForumCategory,
    okpForumSection
)
from okp.forums.serializers.category import (
    okpForumSectionSerializer as okpForumIndexSectionSerializer
)


class okpForumIndexGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = [
            "id", "name", "slug", "founder", "owner"
        ]


class okpForumIndexCategorySerializer(serializers.ModelSerializer):
    sections = okpForumIndexSectionSerializer(many=True)

    class Meta:
        model = okpForumCategory
        fields = [
            "id",
            "name",
            "description",
            "path",
            "breadcrumbs",
            "sections"
        ]


class okpForumIndexSerializer(serializers.ModelSerializer):
    game = okpForumIndexGameSerializer()
    categories = okpForumIndexCategorySerializer(many=True)

    class Meta:
        model = okpForum
        fields = [
            "id",
            "game",
            "categories"
        ]
