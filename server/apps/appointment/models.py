from django.db import models

class Appointment(models.Model):
  app_id = models.BigAutoField(primary_key=True)
  app_date = models.DateField()
  app_start_time = models.TimeField()
  app_end_time = models.TimeField()
  app_room = models.CharField()
  app_status = models.CharField(max_length=50, default='SCHEDULED')
  app_created_at = models.DateTimeField(auto_now_add=True)
  pat = models.ForeignKey('patient.Patient', on_delete=models.CASCADE)
  staff = models.ForeignKey('medicalemployee.Staff', on_delete=models.CASCADE)

  class Meta:
    db_table = 'appointment'