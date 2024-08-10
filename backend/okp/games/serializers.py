from rest_framework import serializers
from okp.games.models import okpGame


class okpGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = [
            "id", "name", "slug"
        ]


class okpGameSideSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = [
            "id", "name", "slug"
        ]
