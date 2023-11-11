from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
from rest_framework import serializers

from okp.users.models import okpUserProfile


User = get_user_model()


class okpUserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="profile.name", read_only=True)
    slug = serializers.CharField(source="profile.slug", read_only=True)
    avatar = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "name", "slug", "avatar"
        ]

    def get_avatar(self, obj):
        request = self.context.get("request")
        if obj.profile.avatar:
            return request.build_absolute_uri(
                obj.profile.avatar.url
            )
        return None
