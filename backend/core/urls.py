from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, TenantViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'tenants', TenantViewSet, basename='tenant')

urlpatterns = [
    path('', include(router.urls)),
]