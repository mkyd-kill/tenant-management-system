from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from .views import PropertyViewSet, TenantViewSet, InspectionViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'tenants', TenantViewSet, basename='tenant')
router.register(r'inspections', InspectionViewSet, basename='inspection')

urlpatterns = [
    path('', include(router.urls)),

    # authentication
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    # api documentation
    path('openapi/', get_schema_view(title="Tenant Management API", version="1.0"), name='openapi-schema'),
]