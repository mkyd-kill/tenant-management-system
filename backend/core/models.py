from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_landlord = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
class PropertyFacilities(models.Model):
    facility_name = models.CharField(max_length=20)
    # add icon to relate to facility name
    
class Property(models.Model):
    NAMING_SYSTEM = (
        ("001", "001"),
        ("002", "002"),
        ("003", "003")
    )
    landlord = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    name = models.CharField(max_length=255)
    address = models.TextField()
    number_of_rooms = models.PositiveIntegerField(default=0)
    number_of_floors = models.PositiveIntegerField(default=0)
    rooms_naming_sytem = models.CharField(choices=NAMING_SYSTEM, default="001", max_length=10)
    facilities = models.ForeignKey(PropertyFacilities, on_delete=models.CASCADE, related_name="facilities")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # preventing duplicate property names per landlord
        unique_together = ('landlord', 'name')

    def __str__(self):
        return f'{self.name} ({self.landlord.email})'
    
class Tenant(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='tenants')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    room_number = models.CharField(max_length=20) # add a way to query room number and floor number from property field
    floor_number = models.PositiveIntegerField(default=0)
    move_in_date = models.DateField(blank=True, null=True)
    move_out_date = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.property.name})"