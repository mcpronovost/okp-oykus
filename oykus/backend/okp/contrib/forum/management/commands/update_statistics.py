from django.core.management.base import BaseCommand

from okp.contrib.forum.models import OkpForum


class Command(BaseCommand):
    help = "Update statistics for forums"

    def handle(self, *args, **kwargs):
        forums = OkpForum.objects.filter(is_active=True)
        for forum in forums:
            game = forum.game
            forum.total_users = game.characters.values("user").distinct().count()
            forum.total_characters = game.characters.count()
            forum.total_topics = game.topics.count()
            forum.total_posts = game.posts.count()
            forum.save(
                update_fields=[
                    "total_users",
                    "total_characters",
                    "total_topics",
                    "total_posts",
                ]
            )
