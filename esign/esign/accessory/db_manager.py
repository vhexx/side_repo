import traceback
import django
from django.db.transaction import set_autocommit, commit, rollback

from esign.models import Types, Attributes, Entities, Parameters

set_autocommit(False)

t_signature = Types.objects.get(id=13)


def get_entities_and_params(type_of_entity):
    entities = Entities.objects.filter(type=type_of_entity)
    params = []
    for i in entities:
        params.append(Parameters.objects.filter(entity=i))
    return params


def parse_entities_and_params(type_of_entity):
    params = get_entities_and_params(type_of_entity)
    if params is None:
        return
    #results = [list(map(lambda p: str(p.attribute.name), params[0]))]
    results = []
    for i in params:
        results.append(list(map(lambda p: p.float_value or p.string_value, i)))
    return results