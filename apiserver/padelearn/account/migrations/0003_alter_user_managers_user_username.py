# Generated by Django 5.1.1 on 2024-09-20 14:55

import django.contrib.auth.models
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0002_alter_user_options_alter_user_table"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="user",
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="username",
            field=models.CharField(
                default=django.utils.timezone.now, max_length=128, unique=True
            ),
            preserve_default=False,
        ),
    ]
