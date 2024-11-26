# Generated by Django 5.1.1 on 2024-09-21 19:02

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0006_trainerpermission"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="date_of_birth",
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]