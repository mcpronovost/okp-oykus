from rest_framework.permissions import BasePermission


class okpPermissionAny(BasePermission):
    """
    Allows access to everyone.
    """

    def has_permission(self, request, view):
        return bool(True)
