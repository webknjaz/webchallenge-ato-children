from django.contrib.auth.models import User
from rest_framework import serializers

from ..models import Gift, Volunteer


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')


class GiftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Gift
        fields = ('id', 'url', 'mom', 'tel', 'city', 'region', 'region_text',
                  'letter', 'submitted_date', 'status', 'status_text')


class VolunteerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Volunteer
        fields = (
            'url', 'name', 'tel', 'cover_letter', 'submitted_date', 'gift')
