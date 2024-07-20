# from django.utils.translation import gettext_lazy as _
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from okp.users.authentication import RatAuthentication


class okpPing(GenericAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [RatAuthentication]

    def get(self, request, *args, **kwargs):
        content = {
            "user": str(request.user),
            "token": (
                str(request.auth)
                if request.auth is not None else None
            ),
            "auth": (
                request.user.is_authenticated
                if request.user is not None else None
            )
        }
        return Response(content)
