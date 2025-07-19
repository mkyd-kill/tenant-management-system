from rest_framework import permissions
# Ensure that only landlords/landladies can access the system
# and only they can modify and view their own properties/tenants

class IsLandlord(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_landlord
    
class IsObjectOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'landlord'):
            return obj.landlord == request.user
        
        if hasattr(obj, 'property'):
            return obj.property.landlord == request.user
        
        if hasattr(obj, 'tenant'):
            return obj.tenant.property.landlord == request.user
        
        if hasattr(obj, 'staff'):
            return obj.staff.landlord == request.user
        return False