# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('name', models.CharField(max_length=32)),
                ('region', models.IntegerField(choices=[(0, 'Автономна Республіка Крим'), (1, 'Вінницька область'), (2, 'Волинська область'), (3, 'Дніпропетровська область'), (4, 'Донецька область'), (5, 'Житомирська область'), (6, 'Закарпатська область'), (7, 'Запорізька область'), (8, 'Івано-Франківська область'), (9, 'Київська область'), (10, 'Кіровоградська область'), (11, 'Луганська область'), (12, 'Львівська область'), (13, 'Миколаївська область'), (14, 'Одеська область'), (15, 'Полтавська область'), (16, 'Рівненська область'), (17, 'Сумська область'), (18, 'Тернопільська область'), (19, 'Харківська область'), (20, 'Херсонська область'), (21, 'Хмельницька область'), (22, 'Черкаська область'), (23, 'Чернівецька область'), (24, 'Чернігівська область')])),
            ],
        ),
        migrations.CreateModel(
            name='Gift',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('mom', models.CharField(max_length=32)),
                ('tel', models.CharField(max_length=10)),
                ('letter', models.TextField()),
                ('submitted_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.IntegerField(default=0, choices=[(0, 'новий'), (1, 'пошук волонтерів'), (2, 'волонтери затверджені'), (3, 'координація'), (4, 'подарунок вручено')])),
                ('city', models.ForeignKey(related_name='gifts', to='ato_children.City')),
            ],
        ),
        migrations.CreateModel(
            name='Volunteer',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('name', models.CharField(max_length=32)),
                ('tel', models.CharField(max_length=10)),
                ('cover_letter', models.TextField()),
                ('submitted_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('gift', models.ForeignKey(related_name='volunteers', to='ato_children.Gift')),
            ],
        ),
    ]
