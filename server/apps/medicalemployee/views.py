from django.shortcuts import render
from rest_framework import generics
from django.db.models import Q
from .serializers import *
from pagination import StandardResultsPagination

class StaffCreateView(generics.CreateAPIView):
  serializer_class = StaffBaseSerializer
  queryset = Staff.objects.all()

class StaffTableView(generics.ListAPIView):
  serializer_class = StaffBaseSerializer
  pagination_class = StandardResultsPagination

  def get_queryset(self):
    queryset = Staff.objects.all()
    return queryset

class StaffSearchView(generics.ListAPIView):
  serializer_class = StaffBaseSerializer

  def get_queryset(self):
    search = self.request.query_params.get('search', '').strip()
    queryset = None
    if search != '':
      queryset = Staff.objects.filter(
        Q(staff_lname__icontains=search) |
        Q(staff_fname__icontains=search) |
        Q(staff_mname__icontains=search) |
        Q(staff_id__iexact=search)
      )
    
    return queryset