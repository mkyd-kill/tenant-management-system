from django.db import models
from django.contrib.auth.models import AbstractUser

class Tenant(AbstractUser):
    phone = models.CharField(max_length=15, blank=True)
    lease_start = models.DateField(null=True, blank=True)
    lease_end = models.DateField(null=True, blank=True)
    move_in_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    UNIQUE_FIELDS = ['username', 'email']

    def __str__(self):
        return self.username