from django.test import TestCase
from .models import Property, Tenant, Staff, User

class LandlordCRUDTest(TestCase):
    def setUp(self):
        self.landlord = User.objects.create_user("landlord2", "landlord2@gmail.com", "pass1234", is_landlord=True)

    def test_create_property(self):
        prop = Property.objects.create(
            landlord=self.landlord, name="Sunset Villa", address="123 Main St", rooms=10, floors=2 
        )
        self.assertEqual(Property.objects.count(), 1)
        self.assertEqual(prop.name, 'Sunset Villa')

    def test_update_property(self):
        prop = Property.objects.create(landlord=self.landlord, name="Sunset Villa", address="123 Main St", rooms=10, floors=2)
        prop.name = "Sunset Plaza"
        prop.save()
        self.assertEqual(Property.objects.first().name, 'Sunset Villa')