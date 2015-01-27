__author__ = 'root'
from django.db import models


class Types(models.Model):
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('self', null=True)


class Attributes(models.Model):
    name = models.CharField(max_length=50)
    datatype = models.CharField(max_length=5)
    type = models.ForeignKey('Types', null=True)


class Entities(models.Model):
    type = models.ForeignKey('Types', null=True)


class Parameters(models.Model):
    entity = models.ForeignKey('Entities', null=True)
    attribute = models.ForeignKey('Attributes', null=True)
    string_value = models.TextField(null=True)
    float_value = models.FloatField(null=True)
