from django.urls import include, path
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'register', views.RegisterViewSet, basename="register")
router.register(r'user', views.UserViewSet, basename="user")
router.register(r'scout-hierarchy', views.ScoutHierarchyViewSet)
router.register(r'zip-code', views.ZipCodeViewSet)
router.register(r'eat-habit-type', views.EatHabitTypeViewSet)
router.register(r'scout-orga-level', views.ScoutOrgaLevelViewSet)
router.register(r'upload-profile-photo', views.ProfileImageUpload, basename='upload')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('auth/', include(router.urls)),
]
