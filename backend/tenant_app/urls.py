from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenantViewSet, TenantRegisterViewSet

router = DefaultRouter()
router.register(r'tenants', TenantViewSet)
router.register(r'register-tenant', TenantRegisterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]