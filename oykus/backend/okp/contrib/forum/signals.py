from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from okp.contrib.forum.models import OkpForumTopic, OkpForumPost


def update_statistics_topic(instance):
    """
    Update statistics for section, category and forum when a topic is saved/deleted.
    """
    # Get related objects
    section = instance.section
    category = instance.category
    forum = instance.forum
    character = instance.character
    user = instance.user

    # Update section statistics
    if section:
        section.total_topics = section.topics.count()
        section.save(update_fields=["total_topics", "updated_at"])

    # Update category statistics
    if category:
        category.total_topics = category.topics.count()
        category.save(update_fields=["total_topics", "updated_at"])

    # Update forum statistics
    if forum:
        forum.total_topics = forum.topics.count()
        forum.save(update_fields=["total_topics", "updated_at"])

    # Update character statistics
    if character:
        character.total_topics = character.topics.count()
        character.save(update_fields=["total_topics", "updated_at"])

    # Update user statistics
    if user:
        user.total_topics = user.topics.count()
        user.save(update_fields=["total_topics", "updated_at"])


def update_statistics_post(instance):
    """
    Update statistics for section, category and forum when a post is saved/deleted.
    """
    # Get related objects
    topic = instance.topic
    section = instance.section
    category = instance.category
    forum = instance.forum
    character = instance.character
    user = instance.user

    # Update topic statistics
    if topic:
        topic.total_posts = topic.posts.count()
        latest_post = topic.posts.order_by("-created_at").first()
        topic.last_post = latest_post
        topic.save(update_fields=["total_posts", "last_post", "updated_at"])

    # Update section statistics
    if section:
        section.total_posts = section.posts.count()
        latest_post = section.posts.order_by("-created_at").first()
        section.last_post = latest_post
        section.save(update_fields=["total_posts", "last_post", "updated_at"])

    # Update category statistics
    if category:
        category.total_posts = category.posts.count()
        latest_post = category.posts.order_by("-created_at").first()
        category.last_post = latest_post
        category.save(update_fields=["total_posts", "last_post", "updated_at"])

    # Update forum statistics
    if forum:
        forum.total_posts = forum.posts.count()
        latest_post = forum.posts.order_by("-created_at").first()
        forum.last_post = latest_post
        forum.save(update_fields=["total_posts", "last_post", "updated_at"])

    # Update character statistics
    if character:
        character.total_posts = character.posts.count()
        latest_post = character.posts.order_by("-created_at").first()
        character.last_post = latest_post
        character.save(update_fields=["total_posts", "last_post", "updated_at"])

    # Update user statistics
    if user:
        user.total_posts = user.posts.count()
        latest_post = user.posts.order_by("-created_at").first()
        user.last_post = latest_post
        user.save(update_fields=["total_posts", "last_post", "updated_at"])


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
