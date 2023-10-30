"""
Django settings for okp project.
"""

import os
from datetime import timedelta
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("SECRET_KEY", "okp")

DEBUG = os.getenv("DEBUG", False)

# =============================================================================
# Applications
# https://docs.djangoproject.com/en/4.1/ref/applications/

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # ===---
    "colorfield",  # https://pypi.org/project/django-colorfield/
    "corsheaders",  # https://github.com/adamchainz/django-cors-headers
    "rest_framework",  # https://www.django-rest-framework.org/
    "knox",  # https://pypi.org/project/django-rest-knox/
    # ===---
    "okp.users",
    # ===---
    "django_cleanup"  # last | https://github.com/un1t/django-cleanup
]

# =============================================================================
# Middleware
# https://docs.djangoproject.com/en/4.1/ref/middleware/

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    # "django.middleware.common.BrokenLinkEmailsMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "templates")
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# =============================================================================
# CORS and Security
# https://pypi.org/project/django-cors-headers/

WSGI_APPLICATION = "okp.wsgi.application"

ROOT_URLCONF = "okp.urls"

APPEND_SLASH = True

CSRF_COOKIE_AGE = 86400

ALLOWED_HOSTS = ["*"]

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_WHITELIST = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

# =============================================================================
# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": os.getenv("DB_ENGINE", ""),
        "NAME": os.getenv("DB_NAME", ""),
        "USER": os.getenv("DB_USER", ""),
        "PASSWORD": os.getenv("DB_PASSWORD", ""),
        "HOST": os.getenv("DB_HOST", ""),
        "PORT": os.getenv("DB_PORT", "")
    }
}

# =============================================================================
# REST framework
# https://www.django-rest-framework.org/api-guide/settings/

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer"
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.MultiPartParser"
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "knox.auth.TokenAuthentication"
    ]
}

REST_KNOX = {
  "TOKEN_TTL": timedelta(days=30),
  "TOKEN_LIMIT_PER_USER": 3,
  "USER_SERIALIZER": "knox.serializers.UserSerializer"
}

# =============================================================================
# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 6
        }
    },
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"}
]

PASSWORD_RESET_TIMEOUT = 86400

# =============================================================================
# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGES = [
    ("fr", "Français"),
    ("en", "English")
]

LANGUAGE_CODE = "fr"

TIME_ZONE = "America/Toronto"

USE_I18N = True

USE_L10N = True

USE_TZ = True

LOCALE_PATHS = [
    os.path.join(BASE_DIR, "locales")
]

# =============================================================================
# Email
# https://docs.djangoproject.com/en/4.1/ref/settings/#email

# Get code error notifications
ADMINS = [
    ("M-C Pronovost", "mcpronovostkurkiency@gmail.com")
]

# Get broken link notifications
MANAGERS = [
    ("M-C Pronovost", "mcpronovostkurkiency@gmail.com")
]

# Used only for error messages
SERVER_EMAIL = "mcpronovostkurkiency@gmail.com"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST", "")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")
EMAIL_PORT = os.getenv("EMAIL_PORT", "")

DEFAULT_FROM_EMAIL = "noreply@oykus.ca"
DEFAULT_TO_EMAIL = "mcpronovostkurkiency@gmail.com"

# =============================================================================
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

WHITENOISE_KEEP_ONLY_HASHED_FILES = False

STATIC_URL = "static/"

STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static")
]

MEDIA_URL = "media/"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# =============================================================================
# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# =============================================================================
# Logging Settings
# https://docs.djangoproject.com/en/4.1/topics/logging/

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {
        "hide_staticfiles": {
            "()": "okp.logging.SkipStaticFilter"
        }
    },
    "formatters": {
        "verbose": {
            "format": ">>> [{asctime}] {levelname} : {message}",
            "style": "{"
        }
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "filters": ["hide_staticfiles"],
            "formatter": "verbose"
        },
        "file": {
            "level": "DEBUG",
            "class": "logging.FileHandler",
            "filename": os.path.join(BASE_DIR, "debug.log"),
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "INFO"
        }
    }
}
