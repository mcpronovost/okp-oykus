from rest_framework import serializers

from okp.auth.models import okpUser


class okpUserSerializer(serializers.ModelSerializer):
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
