from rest_framework import serializers
from .models import Tenant
from django.contrib.auth.password_validation import validate_password

class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = '__all__'

class TenantFormSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    class Meta:
        model = Tenant
        fields = ['username', 'email', 'phone', 'password']

    def create(self, validated_data):
        tenant = Tenant.objects.create(**validated_data)
        tenant.set_password(validated_data['password'])
        tenant.save()
        return tenant