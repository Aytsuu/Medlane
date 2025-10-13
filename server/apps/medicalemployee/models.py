from django.db import models
from abstract_classes import AbstractModels

class Staff(AbstractModels):
  staff_id = models.BigAutoField(primary_key=True)
  staff_lname = models.CharField(max_length=100)
  staff_fname = models.CharField(max_length=100)
  staff_mname = models.CharField(max_length=100, null=True, blank=True)
  staff_sex = models.CharField(max_length=50)
  staff_dob = models.DateField()
  staff_pos = models.CharField(max_length=50)
  staff_created_at = models.DateTimeField(auto_now_add=True)

  class Meta:
    db_table = "staff"
  