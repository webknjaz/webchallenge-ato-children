from django.contrib.auth.models import User

from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import permission_classes

from ..models import Gift, Volunteer, City

from .serializers import (UserSerializer, GiftSerializer,
                          VolunteerSerializer, CitySerializer)


class AllowSubmitAny(permissions.DjangoModelPermissionsOrAnonReadOnly):
    """
    AllowSubmitAny extends default model access class and allows create one
    """
    def has_permission(self, request, view):
        return (request.method == 'POST' or
                super(AllowSubmitAny, self).has_permission(request, view))


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@permission_classes((AllowSubmitAny,))
class GiftViewSet(viewsets.ModelViewSet):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer


@permission_classes((AllowSubmitAny,))
class VolunteerViewSet(viewsets.ModelViewSet):
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
