from django.views.generic import TemplateView


class AppView(TemplateView):
    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        return super().get(request)
