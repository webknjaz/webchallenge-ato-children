from django.conf.urls import include, url
from rest_framework import routers

from .views import (UserViewSet, GiftViewSet, VolunteeViewSet, CityViewSet,
                    RegionViewSet)

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()

router.register(r'users', UserViewSet)

router.register(r'gifts', GiftViewSet)
router.register(r'volunteers', VolunteeViewSet)
router.register(r'cities', CityViewSet)
router.register(r'regions', RegionViewSet, base_name='regions')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
        namespace='rest_framework'))
]
