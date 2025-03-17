from rest_framework import serializers

from okp.contrib.game.models import OkpGameTheme


class OkpGameThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpGameTheme
        fields = ("primary",)
        read_only_fields = ("primary",)
