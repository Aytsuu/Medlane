from django.db import models
from abstract_classes import AbstractModels

class Patient(AbstractModels):
  pat_id = models.BigAutoField(primary_key=True)
  pat_lname = models.CharField(max_length=100)
  pat_fname = models.CharField(max_length=100)
  pat_mname = models.CharField(max_length=100, null=True)
  pat_sex = models.CharField(max_length=20)
  pat_dob = models.DateField()
  pat_created_at = models.DateTimeField(auto_now_add=True)

  class Meta:
    db_table = 'patient'