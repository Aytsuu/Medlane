from rest_framework import serializers
from .models import Staff

class StaffBaseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Staff
    fields = '__all__'

class StaffTableSerializer(serializers.ModelSerializer):
  class Meta:
    model = Staff
    fields = '__all__'