# Generated by Django 3.0.7 on 2020-07-02 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='phonebook',
            name='Address',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='phonebook',
            name='BirthDate',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
