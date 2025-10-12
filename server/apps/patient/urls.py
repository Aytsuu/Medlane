from django.urls import path
from .views import *

urlpatterns = [
  path('add/', PatientCreateView.as_view(), name="add-patient"),
  path('list/table/', PatientTableView.as_view(), name="patients-list")
]