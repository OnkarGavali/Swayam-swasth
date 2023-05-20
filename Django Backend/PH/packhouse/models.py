from django.db import models

# Create your models here.

class PHtemp(models.Model):
    id = models.IntegerField(primary_key=True,default=0)
    date = models.DateTimeField(auto_now=True) 
    PH1_temp = models.FloatField()
    PH2_temp = models.FloatField()
    PH3_temp = models.FloatField()
    Temp_external=models.FloatField(null=False)