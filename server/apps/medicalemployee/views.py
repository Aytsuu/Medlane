from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from pagination import StandardResultsPagination

class StaffCreateView(generics.CreateAPIView):
  serializer_class = StaffBaseSerializer
  queryset = Staff.objects.all()

class StaffTableView(generics.ListAPIView):
  serializer_class = StaffTableSerializer
  pagination_class = StandardResultsPagination

  def get_queryset(self):
    queryset = Staff.objects.all()
    return queryset
