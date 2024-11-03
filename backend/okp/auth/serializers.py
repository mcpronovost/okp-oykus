from rest_framework import serializers
from django.contrib.auth.models import User

from okp.auth.models import okpUserProfile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("public_name", "avatar", "bio")


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ("id", "username", "email", "profile")
        read_only_fields = ("id", "username", "email")

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", {})
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        return instance
