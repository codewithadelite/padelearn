# Generated by Django 5.1.1 on 2024-10-03 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0008_alter_trainerpermission_options_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="date_of_birth",
            field=models.DateField(blank=True, null=True),
        ),
    ]
