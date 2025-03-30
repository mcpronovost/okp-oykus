from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from okp.core.views import OkpPageView
from okp.contrib.auth.serializers import (
    OkpUserSerializer,
)


class OkpAuthMeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        serialized_user = OkpUserSerializer(request.user)
        return Response(
            {
                "user": serialized_user.data,
            }
        )


class OkpMeGamesView(OkpPageView):
    permission_classes = (IsAuthenticated,)
    page_title_field = "title"

    def get_context_data(self, **kwargs):
        # Get the pre-context data
        context = self.get_pre_context(**kwargs)

        return context
