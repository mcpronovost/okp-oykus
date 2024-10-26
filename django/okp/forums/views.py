from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from okp.forums.models import (
    okpForumCategory,
    okpForumSection,
    okpForumTopic
)
from okp.forums.serializers import (
    okpForumsCategoriesSerializer,
    okpForumsCategorySerializer,
    okpForumSectionSerializer,
    okpForumTopicSerializer,
    okpForumTopicMessagesSerializer
)


class okpForumCategoriesView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpForumCategory.objects.filter(game__slug=kwargs["slug"])
        categories = okpForumsCategoriesSerializer(queryset, many=True).data
        return Response(categories)


class okpForumCategoryView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpForumCategory.objects.filter(
            pk=kwargs["pk"], game__slug=kwargs["slug"]
        ).first()
        if queryset is None:
            return Response(None, status=404)
        category = okpForumsCategorySerializer(queryset).data
        return Response(category)


class okpForumSectionView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpForumSection.objects.filter(
            pk=kwargs["pk"], game__slug=kwargs["slug"]
        ).first()
        if queryset is None:
            return Response(None, status=404)
        section = okpForumSectionSerializer(queryset).data
        return Response(section)


class okpForumTopicView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpForumTopic.objects.filter(
            pk=kwargs["pk"], game__slug=kwargs["slug"]
        ).first()
        if queryset is None:
            return Response(None, status=404)
        topic = okpForumTopicSerializer(queryset).data
        return Response(topic)


class okpForumTopicMessagesView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpForumTopic.objects.filter(
            pk=kwargs["pk"], game__slug=kwargs["slug"]
        ).first()
        if queryset is None:
            return Response(None, status=404)
        page = int(request.query_params.get("page", 1))
        topic = okpForumTopicMessagesSerializer(queryset, context={
            "page": page
        }).data
        return Response(topic)
