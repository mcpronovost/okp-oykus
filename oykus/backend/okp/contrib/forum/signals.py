from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from okp.contrib.forum.models import OkpForumTopic, OkpForumPost
from okp.contrib.forum.utils import update_statistics_topic, update_statistics_post


@receiver(post_save, sender=OkpForumTopic)
def update_statistics_on_topic_save(sender, instance, **kwargs):
    """
    Update statistics for section, category and forum when a topic is saved.
    """
    update_statistics_topic(instance)


@receiver(post_delete, sender=OkpForumTopic)
def update_statistics_on_topic_delete(sender, instance, **kwargs):
    """
    Update statistics for section, category and forum when a topic is deleted.
    """
    update_statistics_topic(instance)


@receiver(post_save, sender=OkpForumPost)
def update_statistics_on_post_save(sender, instance, **kwargs):
    """
    Update statistics for topic, section, category and forum when a post is saved.
    """
    update_statistics_post(instance)


@receiver(post_delete, sender=OkpForumPost)
def update_statistics_on_post_delete(sender, instance, **kwargs):
    """
    Update statistics for topic, section, category and forum when a post is deleted.
    """
    update_statistics_post(instance)
