from rest_framework import serializers

from okp.forums.models import okpForumCategory


class okpForumsCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumCategory
        fields = ["id", "name", "slug", "description", "sortby", "sections"]


class okpForumsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = okpForumCategory
        fields = ["id", "name", "slug", "description", "sortby", "sections"]
