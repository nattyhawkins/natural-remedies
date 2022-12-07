from django.urls import path
from .views import Active_IngredientListView, Active_IngredientDetailView

urlpatterns = [
  path('', Active_IngredientListView.as_view()),
  path('<int:pk>/', Active_IngredientDetailView.as_view())

]