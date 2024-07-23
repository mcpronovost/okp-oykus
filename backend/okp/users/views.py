import base64
# from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from okp.users.authentication import okpRatAuthentication
from okp.users.models import okpRat


class okpPingView(GenericAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [okpRatAuthentication]

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
            content["user"] = str(request.user)
            content["rat"] = str(request.auth)
            content["auth"] = True
        return Response(content)


class okpLoginView(GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = str(request.data.get("username"))
        password = str(request.data.get("mdp"))
        agent = str(request.data.get("agent"))
        user = authenticate(
            username=username,
            password=password
        )
        if user is not None:
            user.last_login = timezone.now()
            user.save()
            rat, created = okpRat.objects.get_or_create(
                user=user,
                agent=base64.b64decode(agent).decode("UTF-8")
            )
            return Response({
                "valid": True,
                "rat": rat.rat
            })
        return Response({
            "valid": False
        })


class okpRatView(GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = str(request.data.get("username"))
        password = str(request.data.get("mdp"))
        agent = str(request.data.get("agent"))
        user = authenticate(
            username=username,
            password=password
        )
        if user is not None:
            rat, created = okpRat.objects.get_or_create(
                user=user,
                agent=base64.b64decode(agent).decode("UTF-8")
            )
            return Response({
                "valid": True,
                "rat": rat
            })
        return Response({
            "valid": False
        })
