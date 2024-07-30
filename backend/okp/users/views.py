from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from okp.users.authentication import (
    get_authorization_header,
    get_agent_header
)
from okp.users.models import okpRat
from okp.users.serializers import okpUserLoginSerializer


class okpPingView(GenericAPIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        content = {
            "user": None,
            "rat": None,
            "auth": False
        }
        if request.user.is_authenticated:
            if (
                request.user.last_login is None
                or (
                    (timezone.now() - timezone.timedelta(minutes=5))
                    > request.user.last_login
                )
            ):
                request.user.last_login = timezone.now()
                request.user.save()
            content["user"] = {
                "username": str(request.user),
                "name": str(request.user.profile.name)
            }
            content["rat"] = str(request.auth)
            content["auth"] = True
        return Response(content)


class okpLoginView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = okpUserLoginSerializer

    def post(self, request, *args, **kwargs):
        authagent = get_agent_header(request)
        agent = authagent.decode()
        username = str(request.data.get("username"))
        password = str(request.data.get("password"))
        user = authenticate(
            username=username,
            password=password
        )
        if user is not None:
            user.last_login = timezone.now()
            user.save()
            rat, created = okpRat.objects.get_or_create(
                user=user,
                agent=agent
            )
            return Response({
                "valid": True,
                "username": str(user.username),
                "rat": str(rat.rat)
            })
        return Response({
            "valid": False
        })


class okpLogoutView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = okpUserLoginSerializer

    def post(self, request, *args, **kwargs):
        if request.user is not None:
            authtoken = get_authorization_header(request).split()
            authagent = get_agent_header(request)
            rat = authtoken[1].decode()
            agent = authagent.decode()
            try:
                okpRat.objects.filter(
                    user=request.user,
                    rat=rat,
                    agent=agent
                ).delete()
            except Exception:
                return Response({
                    "valid": False,
                    "msg": _("Token doesn't exist.")
                })
            return Response({
                "valid": True
            })
        return Response({
            "valid": False
        })
