import traceback
import django
from django.db.transaction import set_autocommit, commit, rollback

from esign.models import Types, Attributes, Entities, Parameters
set_autocommit(False)