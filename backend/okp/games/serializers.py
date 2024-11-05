from rest_framework import serializers

from okp.games.models import (
    okpGame,
    okpGameTheme,
    okpCharacter
)


class okpGameThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGameTheme
        fields = "__all__"


class okpGameSerializer(serializers.ModelSerializer):
    founder = serializers.SerializerMethodField()
    owner = serializers.SerializerMethodField()
    theme = okpGameThemeSerializer()

    class Meta:
        model = okpGame
        fields = ["id", "name", "slug", "abbr", "founder", "owner", "version",
                  "theme", "created_at", "updated_at"]

    def get_founder(self, obj):
        if obj.founder:
            return {
                "id": obj.founder.id,
                "playername": obj.founder.playername,
                "abbr": obj.founder.abbr
            }
        return None

    def get_owner(self, obj):
        if obj.owner:
            return {
                "id": obj.owner.id,
                "playername": obj.owner.playername,
                "abbr": obj.owner.abbr
            }
        return None


class okpGamesSerializer(serializers.ModelSerializer):
    theme = okpGameThemeSerializer()

    class Meta:
        model = okpGame
        fields = ["id", "name", "slug", "abbr", "version",
                  "theme", "created_at", "updated_at"]


class okpCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpCharacter
        fields = ["id", "name", "abbr", "slug", "avatar"]
        read_only_fields = [
            "id",
            "slug"
        ]
