from django.test import TestCase
from django.contrib.auth.models import User
from main_app.models import Finch, Toy, Feeding, Photo
from datetime import date

class ModelsTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')

        self.finch1 = Finch.objects.create(name='Felix', breed='Tabby', description='Playful finch', age=3, user=self.user)
        self.finch2 = Finch.objects.create(name='Whiskers', breed='Tabby', description='A playful finch.', age=5, user=self.user)

        self.toy1 = Toy.objects.create(name='Mouse', color='Gray')
        self.toy2 = Toy.objects.create(name='Ball', color='Red')
        self.toy3 = Toy.objects.create(name='Feather', color='white')

        self.feeding1 = Feeding.objects.create(date=date(2025, 1, 1), meal='B', finch=self.finch1)
        self.feeding2 = Feeding.objects.create(date=date(2024, 1, 1), meal='L', finch=self.finch1)
        self.feeding3 = Feeding.objects.create(date=date(2023, 1, 1), meal='D', finch=self.finch2)

        self.photo1 = Photo.objects.create(finch=self.finch1, url='http://url1.com', title='First')
        self.photo2 = Photo.objects.create(finch=self.finch2, url='http://url2.com', title='First')

        self.finch1.toys.set([self.toy1, self.toy2])








    def test_user_create(self):
        self.assertEqual(str(self.user), 'testuser')

    def test_finch_create(self):
        self.assertEqual(str(self.finch1), 'Felix')
        self.assertEqual(str(self.finch2), 'Whiskers')

    def test_toy_create(self):
        self.assertEqual(str(self.toy1), 'Mouse')
        self.assertEqual(str(self.toy2), 'Ball')
        self.assertEqual(str(self.toy3), 'Feather')

    def test_feeding_create(self):
        self.assertEqual(str(self.feeding1), 'B')
        self.assertEqual(str(self.feeding2), 'L')
        self.assertEqual(str(self.feeding3), 'D')









    def test_photo_create(self):
        self.assertEqual(str(self.photo1), 'http://url1.com')
        self.assertEqual(str(self.photo2), 'http://url2.com')

    def test_finch_toys_relationship(self):
        self.assertEqual(self.finch1.toys.count(), 2)
        self.assertIn(self.toy1, self.finch1.toys.all())
        self.assertIn(self.toy2, self.finch1.toys.all())

    def test_finch_user_relationship(self):
        self.assertEqual(self.finch1.user.username, 'testuser')

    def test_finch_feeding_relationship(self):
        self.assertEqual(self.feeding1.finch, self.finch1)
        self.assertEqual(self.feeding2.finch, self.finch1)
        self.assertEqual(self.feeding3.finch, self.finch2)

    def test_finch_photo_relationship(self):
        self.assertEqual(self.photo1.finch, self.finch1)
        self.assertEqual(self.photo2.finch, self.finch2)

    def test_feeding_ordering(self):
        feedings = Feeding.objects.filter(finch=self.finch1).order_by('date')
        self.assertEqual(feedings[0].date, date(2024, 1, 1))
        self.assertEqual(feedings[1].date, date(2025, 1, 1))

        all_feedings = Feeding.objects.all().order_by('-date')
        self.assertEqual(all_feedings[0].date, date(2025, 1, 1))
        self.assertEqual(all_feedings[1].date, date(2024, 1, 1))
        self.assertEqual(all_feedings[2].date, date(2023, 1, 1))










    def test_deleting_cat_cascades_to_feedings(self):
        self.assertEqual(Feeding.objects.count(), 3)
        self.finch2.delete()
        self.assertEqual(Feeding.objects.count(), 2)

    def test_deleting_cat_cascades_to_photo(self):
        self.finch1.delete()
        self.assertEqual(Photo.objects.count(), 1)

    def test_deleting_user_cascades_to_finch(self):
        self.user.delete()
        self.assertEqual(Finch.objects.count(), 0)
