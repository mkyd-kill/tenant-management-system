from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, TenantViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet.as_view, basename='property')
router.register(r'tenants', TenantViewSet.as_view, basename='tenants')

urlpatterns = [
    path('', include(router.urls)),
]