from rest_framework import serializers
from .models import *

class BillingBaseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Billing
    fields = "__all__"
