# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('esign', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attributes',
            name='type',
            field=models.ForeignKey(null=True, to='esign.Types'),
        ),
        migrations.AlterField(
            model_name='entities',
            name='type',
            field=models.ForeignKey(null=True, to='esign.Types'),
        ),
        migrations.AlterField(
            model_name='parameters',
            name='attribute',
            field=models.ForeignKey(null=True, to='esign.Attributes'),
        ),
        migrations.AlterField(
            model_name='parameters',
            name='entity',
            field=models.ForeignKey(null=True, to='esign.Entities'),
        ),
        migrations.AlterField(
            model_name='parameters',
            name='float_value',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='parameters',
            name='string_value',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='types',
            name='parent',
            field=models.ForeignKey(null=True, to='esign.Types'),
        ),
    ]
