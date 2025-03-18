from django.db.models.signals import post_delete
from django.dispatch import receiver

from okp.contrib.forum.models import OkpForumTopic, OkpForumPost


@receiver(post_delete, sender=OkpForumTopic)
def update_statistics_on_topic_delete(sender, instance, **kwargs):
    """
    Update statistics for section, category and forum when a topic is deleted.
    """
    # Get related objects
    section = instance.section
    category = instance.category
    forum = instance.forum

    # Update section statistics
    if section:
        section.total_topics = section.topics.count()
        section.save(update_fields=["total_topics"])

    # Update category statistics
    if category:
        category.total_topics = category.topics.count()
        category.save(update_fields=["total_topics"])

    # Update forum statistics
    if forum:
        forum.total_topics = forum.topics.count()
        forum.save(update_fields=["total_topics"])


@receiver(post_delete, sender=OkpForumPost)
def update_statistics_on_post_delete(sender, instance, **kwargs):
    """
    Update statistics for topic, section, category and forum when a post is deleted.
    """
    # Get related objects
    topic = instance.topic
    section = instance.section
    category = instance.category
    forum = instance.forum

    # Update topic statistics
    if topic:
        topic.total_posts = topic.posts.count()
        latest_post = topic.posts.order_by("-created_at").first()
        topic.last_post = latest_post
        topic.save(update_fields=["total_posts", "last_post"])

    # Update section statistics
    if section:
        section.total_posts = section.posts.count()
        latest_post = section.posts.order_by("-created_at").first()
        section.last_post = latest_post
        section.save(update_fields=["total_posts", "last_post"])

    # Update category statistics
    if category:
        category.total_posts = category.posts.count()
        latest_post = category.posts.order_by("-created_at").first()
        category.last_post = latest_post
        category.save(update_fields=["total_posts", "last_post"])

    # Update forum statistics
    if forum:
        forum.total_posts = forum.posts.count()
        latest_post = forum.posts.order_by("-created_at").first()
        forum.last_post = latest_post
        forum.save(update_fields=["total_posts", "last_post"])
