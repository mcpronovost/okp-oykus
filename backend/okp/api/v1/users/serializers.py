from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class okpUserSerializer(serializers.ModelSerializer):
    """Serializer for user information."""

    class Meta:
        model = User
        fields = ["id", "username", "playername", "abbr", "avatar", "cover"]
        read_only_fields = ["id", "username", "abbr"]
