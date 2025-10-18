from django.urls import path
from .views import *

urlpatterns = [
  path('create/', AppointmentCreateView.as_view(), name="create-appointment"),
  path('list/', AppointmentListView.as_view(), name="appointments-list"),
  
]