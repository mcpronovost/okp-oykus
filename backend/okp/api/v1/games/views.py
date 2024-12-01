from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from okp.games.models import OkpGame
from .serializers import OkpGameCreateSerializer, OkpGameListSerializer, OkpGameDetailSerializer


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


@extend_schema(
    summary="Game List",
    description="Get all games",
    responses={
        200: OkpGameListSerializer
    },
    tags=["games"]
)
class OkpGameListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OkpGame.objects.all()
    serializer_class = OkpGameListSerializer


@extend_schema(
    summary="Game Detail",
    description="Get a game by slug",
    responses={
        200: OkpGameDetailSerializer,
        404: {"description": "Game not found"},
    },
    tags=["games"]
)
class OkpGameDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OkpGame.objects.all()
    serializer_class = OkpGameDetailSerializer
    lookup_field = "slug"
