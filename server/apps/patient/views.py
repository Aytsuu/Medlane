from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from pagination import StandardResultsPagination

class PatientCreateView(generics.CreateAPIView):
  serializer_class = PatientBaseSerializer
  queryset = Patient.objects.all()

class PatientTableView(generics.ListAPIView):
  serializer_class = PatientTableSerializer
  pagination_class = StandardResultsPagination

  def get_queryset(self):
    queryset = Patient.objects.all()
    return queryset

