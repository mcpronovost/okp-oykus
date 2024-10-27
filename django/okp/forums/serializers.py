import math
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
        fields = ["id", "content", "created_at", "updated_at"]


class okpForumTopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumTopic
        fields = ["id", "name", "slug", "path"]


class okpForumTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumTopic
        fields = ["id", "name", "slug", "path"]


class okpForumTopicMessagesSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()
    messages_pages = serializers.SerializerMethodField()

    class Meta:
        model = okpForumTopic
        fields = ["id", "name", "slug", "path", "messages", "messages_pages"]

    def get_messages(self, obj):
        page = self.context.get("page", 1)
        size = self.context.get("size", 10)

        start = (page - 1) * size
        end = start + size
        messages = obj.messages.all()[start:end]

        return okpForumMessagesSerializer(messages, many=True).data

    def get_messages_pages(self, obj):
        size = self.context.get("size", 10)

        total_pages = math.ceil(obj.messages.count() / size)

        return int(total_pages)


class okpForumSectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumSection
        fields = ["id", "name", "slug", "path"]


class okpForumSectionSerializer(serializers.ModelSerializer):
    topics = okpForumTopicsSerializer(many=True)

    class Meta:
        model = okpForumSection
        fields = ["id", "name", "slug", "path", "topics"]


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
