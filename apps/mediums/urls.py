from .views import MediumListView
from django.urls import path

urlpatterns = [
  path('', MediumListView.as_view())
]