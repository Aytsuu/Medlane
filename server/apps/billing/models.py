from django.db import models
from abstract_classes import AbstractModels

class Billing(AbstractModels):
  bill_id = models.BigAutoField(primary_key=True)
  bill_status = models.CharField(max_length=50, default="UNPAID")
  bill_amount = models.FloatField()
  bill_created_at = models.DateTimeField(auto_now_add=True)
  app = models.ForeignKey('appointment.Appointment', on_delete=models.CASCADE)

  class Meta:
    db_table="billing"