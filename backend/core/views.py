from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Property, Tenant, PropertyInspection
from .serializers import PropertySerializer, TenantSerializer, InspectionSerializer
from .permissions import IsLandlord, IsObjectOwner

# CRUD operations for properties scoped to the logged-in landlord
class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated, IsLandlord, IsObjectOwner]

    def get_queryset(self):
        return Property.objects.filter(landlord=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(landlord=self.request.user)

# CRUD operations for tenants scoped to the landlord's properties
class TenantViewSet(viewsets.ModelViewSet):
    serializer_class = TenantSerializer
    permission_classes = [IsAuthenticated, IsLandlord, IsObjectOwner]

    def get_queryset(self):
        return Tenant.objects.filter(property__landlord=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save()

# property inspection viewset
class InspectionViewSet(viewsets.ModelViewSet):
    serializer_class = InspectionSerializer
    permission_classes = [IsAuthenticated, IsLandlord, IsObjectOwner]

    def get_queryset(self):
        return PropertyInspection.objects.filter(property__landlord=self.request.user)