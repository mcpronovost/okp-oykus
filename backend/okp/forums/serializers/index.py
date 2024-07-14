from rest_framework import serializers

from okp.games.models import okpGame
from okp.forums.models import (
    okpForum,
    okpForumCategory,
    okpForumSection
)


class okpForumIndexGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = [
            "id", "name", "slug", "founder", "owner"
        ]


class okpForumIndexSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumSection
        fields = [
            "id", "name", "description"
        ]


class okpForumIndexCategorySerializer(serializers.ModelSerializer):
    sections = serializers.SerializerMethodField()

    class Meta:
        model = okpForumCategory
        fields = [
            "id", "name", "description", "sections"
        ]

    def get_sections(self, obj):
        sections = okpForumSection.objects.filter(
            category=obj,
            is_visible=True
        )
        return okpForumIndexSectionSerializer(sections, many=True).data


class okpForumIndexSerializer(serializers.ModelSerializer):
    game = okpForumIndexGameSerializer()
    categories = serializers.SerializerMethodField()

    class Meta:
        model = okpForum
        fields = [
            "id", "game", "categories"
        ]

    def get_categories(self, obj):
        categories = okpForumCategory.objects.filter(
            forum=obj,
            is_visible=True
        )
        return okpForumIndexCategorySerializer(categories, many=True).data
