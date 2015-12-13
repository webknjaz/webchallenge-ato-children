from django.db import models
from django.utils import timezone


class Gift(models.Model):
    """Gift is a combination of Mom's data, cover letter and it's status"""

    REGIONS = (
        (0, 'Автономна Республіка Крим'),
        (1, 'Вінницька область'),
        (2, 'Волинська область'),
        (3, 'Дніпропетровська область'),
        (4, 'Донецька область'),
        (5, 'Житомирська область'),
        (6, 'Закарпатська область'),
        (7, 'Запорізька область'),
        (8, 'Івано-Франківська область'),
        (9, 'Київська область'),
        (10, 'Кіровоградська область'),
        (11, 'Луганська область'),
        (12, 'Львівська область'),
        (13, 'Миколаївська область'),
        (14, 'Одеська область'),
        (15, 'Полтавська область'),
        (16, 'Рівненська область'),
        (17, 'Сумська область'),
        (18, 'Тернопільська область'),
        (19, 'Харківська область'),
        (20, 'Херсонська область'),
        (21, 'Хмельницька область'),
        (22, 'Черкаська область'),
        (23, 'Чернівецька область'),
        (24, 'Чернігівська область')
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

    def __str__(self):
        return "{}'s Gift request. Volunteers making presents: {}".format(
            self.mom, ', '.join(self.volunteers))


class Volunteer(models.Model):
    """Volunteer is a person who wants to make a gift to a child"""

    name = models.CharField(max_length=32)
    tel = models.CharField(max_length=10)
    cover_letter = models.TextField()
    submitted_date = models.DateTimeField(default=timezone.now)
    gift = models.ForeignKey('Gift', related_name="volunteers")
