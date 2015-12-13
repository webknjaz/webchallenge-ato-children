from django.db import models
from django.utils import timezone


class Gift(models.Model):
    """Gift is a combination of Mom's data, cover letter and it's status"""

    REGIONS = (
        (0, 'Київська область'),
        (1, 'Вінницька область'),
        (2, 'Волинська область'),
        (3, 'Дніпропетровська область'),
        (4, 'Донецька область'),
        (5, 'Житомирська область'),
        (6, 'Закарпатська область'),
        (7, 'Запорізька область'),
        (8, 'Івано-Франківська область'),
        (9, 'Кіровоградська область'),
        (10, 'Луганська область'),
        (11, 'Львівська область'),
        (12, 'Миколаївська область'),
        (13, 'Одеська область'),
        (14, 'Полтавська область'),
        (15, 'Рівненська область'),
        (16, 'Сумська область'),
        (17, 'Тернопільська область'),
        (18, 'Харківська область'),
        (19, 'Херсонська область'),
        (20, 'Хмельницька область'),
        (21, 'Черкаська область'),
        (22, 'Чернівецька область'),
        (23, 'Чернігівська область'),
        (24, 'Автономна Республіка Крим'),
    )

    STATUSES = (
        (0, 'новий'),
        (1, 'пошук волонтерів'),
        (2, 'волонтери затверджені'),
        (3, 'координація'),
        (4, 'подарунок вручено'),
    )

    mom = models.CharField(max_length=32)
    tel = models.CharField(max_length=10)
    city = models.CharField(max_length=32)
    letter = models.TextField()
    submitted_date = models.DateTimeField(default=timezone.now)
    status = models.IntegerField(choices=STATUSES, default=STATUSES[0][0])
    region = models.IntegerField(choices=REGIONS, default=REGIONS[9][0])

    @staticmethod
    def regions_dict():
        return [{'id': id, 'name': name} for id, name in Gift.REGIONS]

    @property
    def region_text(self):
        return self.REGIONS[self.region][1]

    @property
    def status_text(self):
        return self.STATUSES[self.status][1]


class Volunteer(models.Model):
    """Volunteer is a person who wants to make a gift to a child"""

    name = models.CharField(max_length=32)
    tel = models.CharField(max_length=10)
    cover_letter = models.TextField()
    submitted_date = models.DateTimeField(default=timezone.now)
    gift = models.ForeignKey('Gift', related_name="volunteers")
