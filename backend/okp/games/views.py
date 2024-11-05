from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from okp.games.models import okpGame, okpCharacter
from okp.games.serializers import (
    okpGamesSerializer,
    okpGameSerializer,
    okpCharacterSerializer
)


class okpGamesView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        queryset = okpGame.objects.all()
        games = okpGamesSerializer(queryset, many=True).data
        return Response(games)


class okpGameView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpGame.objects.filter(slug=kwargs["slug"]).first()
        if queryset is None:
            return Response(None, status=404)
        game = okpGameSerializer(queryset).data
        return Response(game)


class okpCharacterView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpCharacter.objects.filter(pk=kwargs["pk"]).first()
        if queryset is None:
            return Response(None, status=404)
        character = okpCharacterSerializer(queryset).data
        return Response(character)
