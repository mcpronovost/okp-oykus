from rest_framework import serializers

from okp.auth.models import okpUser
from okp.games.models import okpGame, okpCharacter


class okpMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpUser
        fields = [
            "id",
            "playername",
            "abbr",
            "avatar"
        ]
        read_only_fields = [
            "id"
        ]


class okpMeCharacterGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = ["id", "name", "slug"]
        read_only_fields = [
            "id",
            "slug"
        ]


class okpMeCharactersSerializer(serializers.ModelSerializer):
    game = okpMeCharacterGameSerializer()

    class Meta:
        model = okpCharacter
        fields = ["id", "name", "abbr", "slug", "avatar", "game"]
        read_only_fields = [
            "id",
            "slug",
            "game"
        ]
