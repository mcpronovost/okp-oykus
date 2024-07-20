from django.utils.translation import gettext_lazy as _
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication


class okpPing(GenericAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

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
