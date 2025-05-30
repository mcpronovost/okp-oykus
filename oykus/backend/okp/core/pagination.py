from rest_framework import pagination
from rest_framework.response import Response


class OkpPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "page": self.page.number,
            "count": self.page.paginator.count,
            "results": data,
        })
