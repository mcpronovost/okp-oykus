from rest_framework import serializers

from okp.contrib.game.models import OkpGame


class OkpGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpGame
        fields = ("id", "title", "slug")
