from rest_framework import serializers

from okp.contrib.game.models import OkpGameTheme


class OkpGameThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpGameTheme
        fields = (
            "primary",
            "core_bg",
            "core_fg",
            "core_link",
            "core_border",
            "core_header_bg",
            "core_header_fg",
            "core_elevated_bg",
            "core_elevated_fg",
            "card_bg",
            "card_placeholder_bg",
            "card_placeholder_fg",
            "card_separator",
        )
