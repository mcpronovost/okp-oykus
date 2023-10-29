from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND

from okp.api.permissions import okpPermissionAny

User = get_user_model()


class okpPingView(APIView):
    permission_classes = [okpPermissionAny]

    def get(self, request, fallback=None):
        if fallback:
            return Response(status=HTTP_404_NOT_FOUND)
        return Response({
            "valid": True
        })
