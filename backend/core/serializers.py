from rest_framework import serializers
from .models import Property, Tenant, PropertyInspection

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'name', 'address', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class TenantSerializer(serializers.ModelSerializer):
    property_id = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all(), source='property')

    class Meta:
        model = Tenant
        fields = ['id', 'property_id', 'first_name', 'last_name', 'email', 'phone', 'move_in_date', 'move_out_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def send_rent_reminders():
        tenants = Tenant.objects.all()
        for tenant in tenants:
            tenant.check_rent_due()

class InspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyInspection
        fields = ['id', 'property_id', 'condition', 'date']