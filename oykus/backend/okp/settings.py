"""
Django 5.1.5 settings.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / "subdir".
BASE_DIR = Path(__file__).resolve().parent.parent
ROOT_DIR = BASE_DIR.parent

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

DEBUG = os.getenv("DJANGO_DEBUG") == "True"


# Applications
# https://docs.djangoproject.com/en/5.1/ref/applications/

INSTALLED_APPS = [
    # unfold
    "unfold",
    # django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # tiers
    "corsheaders",
    "rest_framework",
    "knox",
    "drf_spectacular",
    "colorfield",
    # okp
    "okp.core",
    "okp.contrib.auth",
    "okp.contrib.game",
    "okp.contrib.forum",
    "okp.api",
    # cleanup
    "django_cleanup.apps.CleanupConfig",
]


# Middlewares
# https://docs.djangoproject.com/en/5.1/topics/http/middleware/

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "okp.core.middlewares.OkpAdminOrderMiddleware",
]


# Cors Settings
# https://pypi.org/project/django-cors-headers/

ALLOWED_HOSTS = ["*"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5173",
]

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOW_CREDENTIALS = True


# Auth
# https://docs.djangoproject.com/en/5.1/topics/auth/customizing/

AUTH_USER_MODEL = "okp_auth.OkpUser"


# Rest Framework Settings
# https://www.django-rest-framework.org/

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "knox.auth.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_PAGINATION_CLASS": "okp.core.pagination.OkpPagination",
    "PAGE_SIZE": 24,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

KNOX_TOKEN_MODEL = "okp_auth.OkpAuthToken"

REST_KNOX = {
    "TOKEN_LIMIT_PER_USER": 4,
    "USER_SERIALIZER": "knox.serializers.UserSerializer",
    "AUTH_HEADER_PREFIX": "okp",
    "TOKEN_MODEL": KNOX_TOKEN_MODEL,
}

SPECTACULAR_SETTINGS = {
    "TITLE": "OKP API",
    "DESCRIPTION": "OKP API Documentation",
    "VERSION": "1.0.0",
}


# Templates
# https://docs.djangoproject.com/en/5.1/ref/settings/#templates

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": (ROOT_DIR / "frontend" / "dist",) if not DEBUG else [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.i18n",
            ],
        },
    },
]


# Storage
# https://docs.djangoproject.com/en/5.1/ref/settings/#storages

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

ROOT_URLCONF = "okp.urls"

WSGI_APPLICATION = "okp.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": os.getenv("DB_ENGINE"),
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        "PORT": os.getenv("DB_PORT"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

PASSWORD_VALIDATION = "django.contrib.auth.password_validation"

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": f"{PASSWORD_VALIDATION}.UserAttributeSimilarityValidator",
    },
    {
        "NAME": f"{PASSWORD_VALIDATION}.MinimumLengthValidator",
    },
    {
        "NAME": f"{PASSWORD_VALIDATION}.CommonPasswordValidator",
    },
    {
        "NAME": f"{PASSWORD_VALIDATION}.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = os.getenv("LANGUAGE")

LANGUAGES = [
    ("en", "English"),
    ("fr", "French"),
]

LOCALE_PATHS = [
    BASE_DIR / "locale",
]

TIME_ZONE = os.getenv("TIME_ZONE")

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "data" / "staticfiles"
STATICFILES_DIRS = (
    ROOT_DIR / "frontend" / "dist" / "static",
) if not DEBUG else []

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "data" / "mediafiles"

WHITENOISE_KEEP_ONLY_HASHED_FILES = True


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Unfold Settings
# https://unfoldadmin.com/docs/installation/quickstart

from django.templatetags.static import static  # noqa: E402
from django.urls import reverse_lazy  # noqa: E402

UNFOLD = {
    "SITE_TITLE": "OKP",
    "SITE_HEADER": "Oykus",
    "SITE_SUBHEADER": "Administration",
    "SITE_URL": "/",
    "SITE_SYMBOL": "dashboard",
    "SITE_ICON": lambda request: static("img/oykus-32.png"),
    "SITE_FAVICONS": [
        {
            "rel": "icon",
            "sizes": "32x32",
            "type": "image/png",
            "href": lambda request: static("img/oykus-favicon.png"),
        },
    ],
    "SHOW_HISTORY": True,
    "SHOW_LANGUAGES": True,
    "SHOW_VIEW_ON_SITE": True,
    "SHOW_BACK_BUTTON": True,
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
        "navigation": [
            {
                "title": "Authentication",
                "collapsible": True,
                "items": [
                    {
                        "title": "Users",
                        "icon": "group",
                        "link": reverse_lazy(
                            "admin:okp_auth_okpuser_changelist"
                        ),
                    },
                    {
                        "title": "Tokens",
                        "icon": "token",
                        "link": reverse_lazy(
                            "admin:okp_auth_okpauthtoken_changelist"
                        ),
                    },
                ],
            },
            {
                "title": "Games",
                "separator": True,
                "items": [
                    {
                        "title": "Games",
                        "icon": "gamepad",
                        "link": reverse_lazy(
                            "admin:okp_game_okpgame_changelist"
                        ),
                    },
                    {
                        "title": "Characters",
                        "icon": "face",
                        "link": reverse_lazy(
                            "admin:okp_game_okpgamecharacter_changelist"
                        ),
                    },
                ],
            },
            {
                "title": "Forums",
                "separator": True,
                "items": [
                    {
                        "title": "Forums",
                        "icon": "forum",
                        "link": reverse_lazy(
                            "admin:okp_forum_okpforum_changelist"
                        ),
                    },
                    {
                        "title": "Categories",
                        "icon": "stacks",
                        "link": reverse_lazy(
                            "admin:okp_forum_okpforumcategory_changelist"
                        ),
                    },
                    {
                        "title": "Sections",
                        "icon": "stack",
                        "link": reverse_lazy(
                            "admin:okp_forum_okpforumsection_changelist"
                        ),
                    },
                    {
                        "title": "Topics",
                        "icon": "list",
                        "link": reverse_lazy(
                            "admin:okp_forum_okpforumtopic_changelist"
                        ),
                    },
                    {
                        "title": "Posts",
                        "icon": "text_snippet",
                        "link": reverse_lazy(
                            "admin:okp_forum_okpforumpost_changelist"
                        ),
                    },
                ],
            },
        ],
    },
    "COLORS": {
        "base": {
            "50": "250 250 250",
            "100": "244 244 244",
            "200": "231 231 231",
            "300": "214 214 214",
            "400": "168 168 168",
            "500": "121 121 121",
            "600": "94 94 94",
            "700": "71 71 71",
            "800": "47 47 47",
            "900": "33 33 33",
            "950": "15 15 15",
        },
        "primary": {
            "50": "247 245 235",
            "100": "239 234 214",
            "200": "228 220 185",
            "300": "212 201 143",
            "400": "192 179 93",
            "500": "175 156 45",
            "600": "157 131 15",
            "700": "131 110 12",
            "800": "105 88 10",
            "900": "86 72 8",
            "950": "55 46 5",
        }
    }
}


# OKP Admin Order

OKP_ADMIN_ORDER_APPS = {
    "okp_auth": 1,
    "okp_blog": 2,
    "okp_courrier": 3,
    "okp_forum": 4,
    "admin": 999,
}

OKP_ADMIN_ORDER_MODELS = {
    "okp_auth": {
        "OkpUser": 1,
        "OkpGroup": 2,
        "OkpAuthToken": 3,
    },
    "okp_blog": {
        "OkpBlog": 1,
        "OkpBlogCategory": 2,
        "OkpBlogTag": 3,
        "OkpBlogPost": 4,
        "OkpBlogPostComment": 5,
    },
}
