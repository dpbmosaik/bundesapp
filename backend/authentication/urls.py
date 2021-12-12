from django.urls import include, path
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users', views.UsersViewSet, basename="users")
router.register(r'scout-hierarchy', views.ScoutHierarchyViewSet)
router.register(r'zip-code', views.ZipCodeViewSet)
router.register(r'eat-habit-type', views.EatHabitTypeViewSet)
router.register(r'scout-orga-level', views.ScoutOrgaLevelViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('auth/', include(router.urls)),
]
