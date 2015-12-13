from django.contrib.auth.models import User

from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import permission_classes

from ..models import Gift, Volunteer, City

from .serializers import (UserSerializer, GiftSerializer,
                          VolunteerSerializer, CitySerializer)


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GiftViewSet(viewsets.ModelViewSet):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer


class VolunteeViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer


@permission_classes((permissions.AllowAny,))
class RegionViewSet(viewsets.ViewSet):
    def list(self, request, format=None):
        regions = City.regions_dict()
        return Response({"results": regions, "count": len(regions)},
                        status=status.HTTP_200_OK)
