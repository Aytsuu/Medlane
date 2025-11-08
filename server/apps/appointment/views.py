from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from pagination import StandardResultsPagination

class AppointmentCreateView(generics.CreateAPIView):
  serializer_class = AppointmentCreateSerializer
  queryset = Appointment.objects.all()

class AppointmentListView(generics.ListAPIView):
  serializer_class = AppointmentListSerializer
  pagination_class = StandardResultsPagination

  def get_queryset(self):
    queryset = Appointment.objects.all()
    return queryset