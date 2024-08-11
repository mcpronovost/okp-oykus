from rest_framework import serializers
from django.contrib.auth import get_user_model
from okp.games.models import okpGame


class okpGameUserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="profile.name")

    class Meta:
        model = get_user_model()
        fields = [
            "id", "name"
        ]


class okpGameSerializer(serializers.ModelSerializer):
    founder = okpGameUserSerializer()
    owner = okpGameUserSerializer()

    class Meta:
        model = okpGame
        fields = [
            "id", "name", "slug", "founder", "owner"
        ]


class okpGameSideSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpGame
        fields = [
            "id", "name", "slug"
        ]
