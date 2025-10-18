from django.shortcuts import render
from rest_framework import generics, status
from django.db.models import Q
from .serializers import *
from pagination import StandardResultsPagination

class PatientCreateView(generics.CreateAPIView):
  serializer_class = PatientBaseSerializer
  queryset = Patient.objects.all()

class PatientTableView(generics.ListAPIView):
  serializer_class = PatientBaseSerializer
  pagination_class = StandardResultsPagination

  def get_queryset(self):
    queryset = Patient.objects.all()
    return queryset

class PatientSearchView(generics.ListAPIView):
  serializer_class = PatientBaseSerializer

  def get_queryset(self):
    search = self.request.query_params.get('search', '').strip()
    queryset = None
    if search != '':
      queryset = Patient.objects.filter(
      Q(pat_lname__icontains=search) |
      Q(pat_fname__icontains=search) |
      Q(pat_mname__icontains=search) |
      Q(pat_id__iexact=search)
    )
    
    return queryset