from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from okp.games.models import OkpGame
from .serializers import OkpGameCreateSerializer

@extend_schema(
    summary="Game Create",
    description="Create a new game",
    responses={
        201: OkpGameCreateSerializer,
        400: {"description": "Bad request"},
    },
    tags=["games"]
)
class OkpGameCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OkpGame.objects.all()
    serializer_class = OkpGameCreateSerializer
