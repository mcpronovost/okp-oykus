from django.core.exceptions import ValidationError
from django.core.files.images import get_image_dimensions


def okpValidatorsAvatar(image):
    image_width, image_height = get_image_dimensions(image)
    if image_width != 200 or image_height != 200:
        raise ValidationError("Image sizes needs to be 200x200.")
