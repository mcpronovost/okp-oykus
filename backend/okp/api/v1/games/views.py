from django.db.models import Q
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from okp.games.models import OkpGame
from .pagination import OkpGameListPagination
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
class OkpGameManagementCreateView(CreateAPIView):
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
class OkpGameManagementListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OkpGameListSerializer
    pagination_class = OkpGameListPagination

    def get_queryset(self):
        return OkpGame.objects.filter(
            Q(founder=self.request.user) |
            Q(owner=self.request.user)
        ).order_by("-is_active", "-is_public", "-updated_at", "-created_at")


@extend_schema(
    summary="Game Detail",
    description="Get a game by slug",
    responses={
        200: OkpGameDetailSerializer,
        404: {"description": "Game not found"},
    },
    tags=["games"]
)
class OkpGameManagementDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OkpGame.objects.all()
    serializer_class = OkpGameDetailSerializer
    lookup_field = "slug"
