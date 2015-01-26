__author__ = 'root'
from django.db import models



class Types(models.Model):
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('self')

class Attributes(models.Model):
    name = models.CharField(max_length=50)
    type = models.ForeignKey('Types')

class Entities(models.Model):
    type = models.ForeignKey('Types')

class Parameters(models.Model):
    entity = models.ForeignKey('Entities')
    attribute = models.ForeignKey('Attributes')
    string_value = models.TextField()
    float_value = models.FloatField()
