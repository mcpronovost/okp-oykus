from rest_framework import serializers

from okp.auth.models import okpUser
from okp.games.models import okpCharacter


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


class okpMeCharactersSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpCharacter
        fields = ["id", "name", "abbr", "slug", "avatar"]
        read_only_fields = [
            "id",
            "slug"
        ]
