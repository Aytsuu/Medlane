from rest_framework import serializers
from .models import *

class AppointmentBaseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Appointment
    fields = '__all__'
  
class AppointmentListSerializer(serializers.ModelSerializer):
  patient = serializers.SerializerMethodField()
  staff = serializers.SerializerMethodField()

  class Meta:
    model = Appointment
    fields = ['app_id', 'patient', 'staff', 'app_date', 'app_start_time',
              'app_end_time', 'app_created_at', 'app_status', 'app_room']
    
  def get_patient(self, obj):
    info = obj.pat
    return {
      'id': info.pat_id,
      'name': f'{info.pat_lname}, {info.pat_fname}{f' {info.pat_mname}' if info.pat_mname else ''}'
    }
  
  def get_staff(self, obj): 
    info = obj.staff
    return {
      'id': info.staff_id,
      'name': f'{info.staff_lname}, {info.staff_fname}{f' {info.staff_mname}' if info.staff_mname else ''}',
      'role': info.staff_pos
    }
  
  