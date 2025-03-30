from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.db.models import Prefetch
from .models import Property, Tenant, PropertyInspection
from .serializers import PropertySerializer, TenantSerializer, InspectionSerializer, FacilitySerializer
from .permissions import IsLandlord, IsObjectOwner

# CRUD operations for properties scoped to the logged-in landlord
class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated, IsLandlord, IsObjectOwner]

    def get_queryset(self):
        return Property.objects.filter(landlord=self.request.user).prefetch_related('facilities')
    
    def perform_create(self, serializer):
        serializer.save(landlord=self.request.user)

# CRUD operations for tenants scoped to the landlord's properties
class TenantViewSet(viewsets.ModelViewSet):
    serializer_class = TenantSerializer
    permission_classes = [IsAuthenticated, IsLandlord, IsObjectOwner]

    def get_queryset(self):
        return Tenant.objects.filter(property__landlord=self.request.user).select_related('property', 'rent')
    
    def perform_create(self, serializer):
        tenant = serializer.save()
        if tenant.property.landlord != self.request.user:
            tenant.delete()
            raise PermissionError("You can only add tenants to your own properties")

# property inspection viewset
class InspectionViewSet(viewsets.ModelViewSet):
    serializer_class = InspectionSerializer
    permission_classes = [IsAuthenticated, IsLandlord, IsObjectOwner]

    def get_queryset(self):
        return PropertyInspection.objects.filter(property__landlord=self.request.user).select_related('property')
    
# property facility viewset
class FacilityViewSet(viewsets.ModelViewSet):
    serializer_class = FacilitySerializer
    permission_classes = [IsAuthenticated, IsLandlord, IsObjectOwner]