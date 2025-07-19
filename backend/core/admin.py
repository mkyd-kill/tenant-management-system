from django.contrib import admin
from .models import Property, Tenant, User, Staff

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name']
    search_fields = ('email', 'username',)
    readonly_fields = ['id']

admin.site.register(Property)
admin.site.register(Tenant)
admin.site.register(Staff)