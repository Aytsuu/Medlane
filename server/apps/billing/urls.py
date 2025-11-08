from django.urls import path
from .views import *

urlpatterns = [
  path("list/", BillingTableView.as_view(), name="billing-table")
]