from django.conf import settings
from rest_framework import serializers

from okp.contrib.game.serializers import OkpGameCharacterAuthorSerializer
from okp.contrib.forum.models import OkpForumTopic
from .post import OkpForumSectionPostSerializer, OkpForumTopicPostSerializer


class OkpForumSectionTopicSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)
    last_post = OkpForumSectionPostSerializer(read_only=True)

    class Meta:
        model = OkpForumTopic
        fields = (
            "id",
            "title",
            "slug",
            "url",
            "author",
            "is_pinned",
            "is_important",
            "is_locked",
            "total_posts",
            "last_post",
        )
        read_only_fields = (
            "id",
            "title",
            "slug",
            "url",
            "author",
            "is_pinned",
            "is_important",
            "is_locked",
            "total_posts",
            "last_post",
        )

    def get_author(self, obj):
        if obj.user is None and obj.character is None:
            return None
        author = {}
        # if obj.user:
        #     author["user"] = OkpUserSerializer(obj.user).data
        if obj.character:
            author["character"] = OkpGameCharacterAuthorSerializer(
                obj.character
            ).data
        return author


class OkpForumTopicSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField(read_only=True)
    breadcrumb = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OkpForumTopic
        fields = ("id", "title", "slug", "breadcrumb", "posts", "is_locked")
        read_only_fields = ("id", "title", "slug", "breadcrumb", "posts", "is_locked")

    def get_breadcrumb(self, obj):
        return obj.breadcrumb

    def get_posts(self, obj):
        # Get pagination parameters from context if available
        request = self.context.get("request")
        view = self.context.get("view")

        # Default values
        page_size = settings.REST_FRAMEWORK["PAGE_SIZE"]
        page = 1

        # Try to get pagination parameters from request
        if request and hasattr(request, "query_params"):
            page_size = request.query_params.get("page_size", page_size)
            page = request.query_params.get("page", page)

        # Get all posts for this topic
        posts_queryset = (
            obj.posts.filter(is_visible=True)
            .select_related("user", "character")
            .order_by("created_at")
        )

        # Use the view's paginate_data method if available
        if view and hasattr(view, "paginate_data"):
            paginated_data = view.paginate_data(
                posts_queryset, page_size, page
            )
            # Serialize only the results
            paginated_data["results"] = OkpForumTopicPostSerializer(
                paginated_data["results"], many=True, context=self.context
            ).data
            return paginated_data

        # Fallback if view is not available
        return OkpForumTopicPostSerializer(posts_queryset, many=True).data
