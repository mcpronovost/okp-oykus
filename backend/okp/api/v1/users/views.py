from django.conf import settings
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from knox.views import LogoutAllView as KnoxLogoutAllView
from drf_spectacular.utils import extend_schema

from .serializers import okpUserMeSerializer


@extend_schema(
    summary="Me",
    description="Get the current user",
    responses={
        200: {
            "type": "object",
            "properties": {
                "is_authenticated": {"type": "boolean"},
                "username": {"type": "string"},
            }
        }
    },
    tags=["users"]
)
class MeView(RetrieveAPIView):
    """
    Get the current user
    """
    permission_classes = [AllowAny]
    serializer_class = None

    def get(self, request, format=None):
        if not request.user.is_authenticated:
            return Response({"is_authenticated": False})
        serialized_user = okpUserMeSerializer(request.user)
        return Response({
            "is_authenticated": True,
            **serialized_user.data
        })


class LoginView(KnoxLoginView):
    """
    Custom login view that extends Knox's secure token-based authentication.
    Handles user authentication and creates a token session using Knox.
    Accepts username and password in request data.
    """
    permission_classes = [AllowAny]

    @extend_schema(
        summary="User Login",
        description="Authenticate user and return Knox token",
        request=AuthTokenSerializer,
        responses={
            200: {
                "type": "object",
                "properties": {
                    "token": {"type": "string", "description": "Authentication token"},
                    "expiry": {"type": "string", "format": "date-time", "description": "Token expiry timestamp"},
                    "user": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "integer"},
                            "username": {"type": "string"},
                        }
                    }
                }
            }
        },
        tags=["authentication"]
    )
    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        # Count user's tokens and delete oldest if limit reached
        user_tokens = AuthToken.objects.filter(user=user)
        if user_tokens.count() >= settings.REST_KNOX["TOKEN_LIMIT_PER_USER"]:
            oldest_token = user_tokens.order_by("created").first()
            oldest_token.delete()

        login(request, user)
        return super(LoginView, self).post(request, format=None)


@extend_schema(
    summary="User Logout",
    description="Invalidate the token used for the current request",
    responses={
        204: None,
        401: {"description": "Authentication credentials were not provided."}
    },
    tags=["authentication"]
)
class LogoutView(KnoxLogoutView):
    """
    Custom logout view that extends Knox's secure token-based authentication.
    Handles user logout and destroys the token session using Knox.
    """
    serializer_class = AuthTokenSerializer

    def post(self, request, format=None):
        return super(LogoutView, self).post(request, format=None)


@extend_schema(
    summary="User Logout All",
    description="Invalidate all tokens for the current user",
    responses={
        204: None,
        401: {"description": "Authentication credentials were not provided."}
    },
    tags=["authentication"]
)
class LogoutAllView(KnoxLogoutAllView):
    """
    Custom logout all view that extends Knox's secure token-based authentication.
    Handles user logout and destroys all token sessions using Knox.
    """
    serializer_class = AuthTokenSerializer

    def post(self, request, format=None):
        return super(LogoutAllView, self).post(request, format=None)

