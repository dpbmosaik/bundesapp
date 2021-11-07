from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'add users'

    def handle(self, *args, **options):
        UserModel = get_user_model()

        if not UserModel.objects.filter(username='hagi_admin').exists():
            user = UserModel.objects.create_user('hagi_admin', password='hagi1234')
            user.is_superuser = True
            user.is_staff = True
            user.save()

        if not UserModel.objects.filter(username='robert_admin').exists():
            user = UserModel.objects.create_user('robert_admin', password='robert1234')
            user.is_superuser = True
            user.is_staff = True
            user.save()

        print('user created')
