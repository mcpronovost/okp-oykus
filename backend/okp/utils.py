from django.utils.text import slugify


def get_unique_slug(toslug, model):
    slug = f"{slugify(toslug)}"
    count = 0
    while model.objects.filter(
        slug=slug
    ).exists():
        count += 1
        slug = f"{slugify(toslug)}-{count}"
    return slug
