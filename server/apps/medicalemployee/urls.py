from django.urls import path
from .views import *

urlpatterns = [
  path('add/', StaffCreateView.as_view(), name="add-staff"),
  path('list/table/', StaffTableView.as_view(), name="staffs-list")
]