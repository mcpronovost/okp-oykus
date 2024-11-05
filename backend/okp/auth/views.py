from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
# from knox.auth import TokenAuthentication

from okp.auth.models import okpUser
from okp.auth.serializers import (
    okpMeSerializer,
    okpMeCharactersSerializer
)
from okp.games.models import okpCharacter


class okpMeView(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpUser.objects.first()
        if queryset is None:
            return Response(None, status=404)
        user = okpMeSerializer(queryset).data
        return Response(user)


class okpMeCharactersView(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None, *args, **kwargs):
        queryset = okpCharacter.objects.all()
        if queryset is None:
            return Response(None, status=404)
        characters = okpMeCharactersSerializer(queryset, many=True).data
        return Response(characters)
