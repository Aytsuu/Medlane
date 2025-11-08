from django.shortcuts import render
from rest_framework import generics
from pagination import StandardResultsPagination
from .serializers import *

class BillingTableView(generics.ListAPIView):
  serializer_class = BillingBaseSerializer
  pagination_class = StandardResultsPagination

  def get_queryset(self):
    queryset = Billing.objects.all()
    return queryset
