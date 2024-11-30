from rest_framework import serializers

from okp.games.models import OkpGame


class OkpGameCreateSerializer(serializers.ModelSerializer):
    founder = serializers.HiddenField(default=serializers.CurrentUserDefault())
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = OkpGame
        fields = ["id", "name", "abbr", "slug", "founder", "owner"]
        read_only_fields = ["id", "abbr", "slug"]
