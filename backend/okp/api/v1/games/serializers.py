from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from okp.games.models import OkpGame


class OkpGameCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=OkpGame.objects.all(),
                message=_("This game name is already taken. Please choose another one.")
            ),
            MinLengthValidator(
                limit_value=1,
                message=_("Game name must be at least 1 characters long.")
            ),
            MaxLengthValidator(
                limit_value=120,
                message=_("Game name must be at most 120 characters long.")
            )
        ]
    )
    founder = serializers.HiddenField(default=serializers.CurrentUserDefault())
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = OkpGame
        fields = ["id", "name", "abbr", "slug", "founder", "owner"]
        read_only_fields = ["id", "abbr", "slug"]

    def validate(self, attrs):
        user = self.context["request"].user
        if OkpGame.objects.filter(owner=user).count() >= user.max_games:
            raise serializers.ValidationError(
                _("You cannot create more than {max_games} games.").format(max_games=user.max_games)
            )
        return super().validate(attrs)


class OkpGameListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpGame
        fields = ["id", "name", "abbr", "slug", "is_active", "is_public"]


class OkpGameDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OkpGame
        fields = ["id", "name", "abbr", "slug", "founder", "owner"]
