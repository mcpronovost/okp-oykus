from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

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
