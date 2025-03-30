import json
from rest_framework.permissions import IsAuthenticated

from okp.core.views import OkpPageView


class OkpAuthGamesView(OkpPageView):
    permission_classes = (IsAuthenticated,)
    page_title_field = "title"

    def get_context_data(self, **kwargs):
        print("get_context_data")
        # Get the pre-context data
        context = self.get_pre_context(**kwargs)

        context["initial_data"] = json.dumps({
            "games": [],
        })

        return context
