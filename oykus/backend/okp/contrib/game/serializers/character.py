from rest_framework import serializers

from okp.contrib.game.models import OkpGameCharacter


class OkpGameCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpGameCharacter
        fields = ("id", "name", "slug", "abbr", "avatar")
