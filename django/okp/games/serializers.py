from rest_framework import serializers

from okp.games.models import okpGame


class okpGamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = ["id", "name", "slug", "abbr"]
