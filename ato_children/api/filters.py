import django_filters

from ..models import Gift


class GiftFilter(django_filters.FilterSet):
    """docstring for GiftFilter"""
    class Meta:
        model = Gift
        fields = ['region', 'status']
