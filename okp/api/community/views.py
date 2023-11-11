from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView

from okp.api.permissions import (
    okpPermissionReadOnly
)
from okp.api.community.serializers import (
    okpUserSerializer
)

User = get_user_model()


class okpCommunityUsersListView(APIView):
    permission_classes = [okpPermissionReadOnly]

    def get(self, request, fallback=None):
        if fallback:
            return Response(status=HTTP_404_NOT_FOUND)
        users_list = User.objects.filter(
            is_active=True,
            profile__isnull=False
        ).order_by(
            "-last_login", "-date_joined"
        )
        return Response({
            "valid": True,
            "users": okpUserSerializer(
                users_list,
                many=True
            ).data,
        })
