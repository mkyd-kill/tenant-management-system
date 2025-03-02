from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Tenant
from .serializers import TenantSerializer, TenantFormSerializer

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [IsAuthenticated]

class TenantRegisterViewSet(viewsets.ModelViewSet):
    serializer_class = TenantFormSerializer
    queryset = Tenant.objects.all()
    permission_classes = [AllowAny]