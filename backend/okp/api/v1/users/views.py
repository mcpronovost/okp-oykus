from django.contrib.auth import login

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from knox.views import LogoutAllView as KnoxLogoutAllView
from drf_spectacular.utils import extend_schema


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

