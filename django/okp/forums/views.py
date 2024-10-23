from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from okp.forums.models import okpForumCategory
from okp.forums.serializers import (
    okpForumsCategoriesSerializer,
    okpForumsCategorySerializer,
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
