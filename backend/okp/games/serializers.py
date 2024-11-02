from rest_framework import serializers

from okp.games.models import (
    okpGame,
    okpGameTheme
)


class okpGameThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGameTheme
        fields = "__all__"


class okpGamesSerializer(serializers.ModelSerializer):
    theme = okpGameThemeSerializer()

    class Meta:
        model = okpGame
        fields = ["id", "name", "slug", "abbr", "version", "theme", "created_at", "updated_at"]
