"""
Django settings for padelearn project.

Generated by 'django-admin startproject' using Django 5.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-gn8h3fy7j!y3qovgd2sc5&k!*k2f=^^z)e!yfx$_a#%-cge6xg"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.getenv("DEBUG"))

ALLOWED_HOSTS = [
    "padelearn.onrender.com",
    "www.padelearn.onrender.com",
    "quintessential-reena-padelearn-a9d7581a.koyeb.app",
    "www.quintessential-reena-padelearn-a9d7581a.koyeb.app",
    "127.0.0.1",

]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third party packages
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    "drf_yasg",
    "corsheaders",
    # In house application
    "padelearn.account",
    "padelearn.ai",
    "padelearn.core",
    "padelearn.course",
    "padelearn.program",
    "padelearn.question",
    "padelearn.quiz",
    "padelearn.tools",
    "padelearn.trainer",
    "padelearn.student",
]


# Tell Django to copy static assets into a path called `staticfiles` (this is specific to Render)
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
# Enable the WhiteNoise storage backend, which compresses static files to reduce disk use
# and renames the files with unique names for each version to support long-term caching
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    'padelearn.core.middlewares.delay_middleware.DelayMiddleware',
]

ROOT_URLCONF = "padelearn.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
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

WSGI_APPLICATION = "padelearn.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        "PORT": os.getenv("DB_PORT"),
    }
}


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    )
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "account.User"

INTERNAL_IPS = [
    "127.0.0.1",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:4200"
]


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {
        "Bearer": {"type": "apiKey", "name": "Authorization", "in": "header"},
    }
}

# CELERY SETTINGS
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "")
CELERY_RESULT_SERIALIZER = "json"
CELERY_TASK_SERIALIZER = "json"
CELERY_WORKER_PREFETCH_MULTIPLIER = 1