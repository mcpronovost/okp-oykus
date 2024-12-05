from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

User = get_user_model()


class okpUserMeSerializer(serializers.ModelSerializer):
    """Serializer for user information."""
    playername = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "playername", "abbr", "avatar", "cover"]
        read_only_fields = ["id", "username", "email", "abbr"]

    def get_playername(self, instance):
        player_text = _("Player")
        return instance.playername or f"{player_text} #{instance.id}"


class okpUserSerializer(serializers.ModelSerializer):
    """Serializer for user information."""
    playername = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "playername", "abbr", "avatar", "cover"]
        read_only_fields = ["id", "username", "abbr"]

    def get_playername(self, instance):
        player_text = _("Player")
        return instance.playername or f"{player_text} #{instance.id}"


class okpUserPreviewSerializer(serializers.ModelSerializer):
    playername = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "playername", "abbr", "avatar", "cover"]
        read_only_fields = ["id", "abbr"]

    def get_playername(self, instance):
        player_text = _("Player")
        return instance.playername or f"{player_text} #{instance.id}"
