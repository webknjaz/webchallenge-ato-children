from django.contrib.auth.models import User

from rest_framework import viewsets, status, permissions, filters
from rest_framework.response import Response
from rest_framework.decorators import permission_classes

from ..models import Gift, Volunteer

from .serializers import UserSerializer, GiftSerializer, VolunteerSerializer

from .permissions import AllowSubmitAny

from .filters import GiftFilter


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@permission_classes((AllowSubmitAny,))
class GiftViewSet(viewsets.ModelViewSet):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = GiftFilter


@permission_classes((AllowSubmitAny,))
class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer


@permission_classes((permissions.AllowAny,))
class RegionViewSet(viewsets.ViewSet):
    def list(self, request, format=None):
        regions = Gift.regions_dict()
        return Response({"results": regions, "count": len(regions)},
                        status=status.HTTP_200_OK)
