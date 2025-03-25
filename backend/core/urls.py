from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, TenantViewSet, InspectionViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'tenants', TenantViewSet, basename='tenant')
router.register(r'inspection', InspectionViewSet, basename='inspection')

urlpatterns = [
    path('', include(router.urls)),

    # authentication
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt'))
]