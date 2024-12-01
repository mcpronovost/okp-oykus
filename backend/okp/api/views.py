from rest_framework.views import APIView
from rest_framework.response import Response


class PingView(APIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = None

    def get(self, request):
        return Response({"message": "pong"})
