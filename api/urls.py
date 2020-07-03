from rest_framework import routers
from .api import PhonebookViewSet

router = routers.DefaultRouter()
router.register('api/phonebook', PhonebookViewSet, 'phonebook')

urlpatterns = router.urls