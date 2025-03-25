from rest_framework import serializers
from .models import Property, Tenant, PropertyInspection

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'name', 'address', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class TenantSerializer(serializers.ModelSerializer):
    property_id = serializers.PrimaryKeyRelatedField(queryset=Property.objects.none(), source='property')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.context['request'].user.is_authenticated:
            self.fields['property_id'].queryset = Property.objects.filter(landlord=self.context['request'].user)

    class Meta:
        model = Tenant
        fields = ['id', 'property_id', 'first_name', 'last_name', 'email', 'phone', 'move_in_date', 'move_out_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    # email validation
    def validate_email(self, value):
        if Tenant.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def send_rent_reminders():
        tenants = Tenant.objects.all()
        for tenant in tenants:
            tenant.check_rent_due()

class InspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyInspection
        fields = ['id', 'property_id', 'condition', 'date']