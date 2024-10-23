from rest_framework import serializers

from okp.forums.models import (
    okpForumCategory,
    okpForumSection,
    okpForumTopic,
    okpForumMessage,
)


class okpForumMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumMessage
        fields = ["id", "created_at", "updated_at"]


class okpForumMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumMessage
        fields = ["id", "content", "created_at", "updated_at"]


class okpForumTopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumTopic
        fields = ["id", "name", "slug"]


class okpForumTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumTopic
        fields = ["id", "name", "slug", "messages"]


class okpForumSectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumSection
        fields = ["id", "name", "slug", "path"]


class okpForumSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumSection
        fields = ["id", "name", "slug", "path"]


class okpForumsCategoriesSerializer(serializers.ModelSerializer):
    sections = okpForumSectionsSerializer(many=True)

    class Meta:
        model = okpForumCategory
        fields = ["id", "name", "slug", "path", "description", "sections"]


class okpForumsCategorySerializer(serializers.ModelSerializer):
    sections = okpForumSectionsSerializer(many=True)

    class Meta:
        model = okpForumCategory
        fields = ["id", "name", "slug", "path", "description", "sections"]
