# Generated by Django 4.0 on 2022-01-01 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PHtemp',
            fields=[
                ('id', models.IntegerField(default=0, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now=True)),
                ('PH1_temp', models.FloatField()),
                ('PH2_temp', models.FloatField()),
                ('PH3_temp', models.FloatField()),
                ('Temp_external', models.FloatField()),
            ],
        ),
    ]
