from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from okp.forums.models import okpForumCategory


class okpForumCategoriesView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpForumCategory.objects.filter(
            game__slug=kwargs["slug"]
        )
        categories = [{
            "id": c.id,
            "name": c.name,
            "sortby": c.sortby,
            "sections": [{
                "id": s.id,
                "name": s.name,
                "sortby": c.sortby
            } for s in c.sections.all()]
        } for c in queryset]
        # games = okpGamesSerializer(queryset, many=True).data
        return Response(categories)
