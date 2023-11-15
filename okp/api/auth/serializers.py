from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

from rest_framework import serializers

from okp.users.models import okpUserProfile


User = get_user_model()


class okpUserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "username", "email", "password"
        ]
        extra_kwargs = {
            "email": {"write_only": True},
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        if "email" not in validated_data:
            raise serializers.ValidationError({
                "email": "Email is required."
            })
        if "name" not in validated_data:
            raise serializers.ValidationError({
                "name": "Name is required."
            })
        if User.objects.filter(username=validated_data["username"]).count():
            raise serializers.ValidationError({
                "username": "A user with that username already exists."
            })
        if User.objects.filter(email=validated_data["email"]).count():
            raise serializers.ValidationError({
                "email": "A user with that email already exists."
            })
        if len(validated_data["password"]) < 6:
            raise serializers.ValidationError({
                "password": "That password is too short."
            })
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"]
        )
        okpUserProfile.objects.create(
            user=user,
            name=validated_data["name"],
            slug=slugify(validated_data["name"])
        )
        return user


class okpUserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active and hasattr(user, "profile"):
            return user
        raise serializers.ValidationError(_("Invalid details."))


class okpUserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="profile.name", read_only=True)
    slug = serializers.CharField(source="profile.slug", read_only=True)
    avatar = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id", "username", "name", "slug", "avatar"
        ]

    def get_avatar(self, obj):
        request = self.context.get("request")
        if obj.profile.avatar:
            return request.build_absolute_uri(
                obj.profile.avatar.url
            )
        return None
