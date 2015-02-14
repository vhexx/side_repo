import traceback
import datetime
import django
from django.db.transaction import set_autocommit, commit, rollback

from esign.models import Types, Attributes, Entities, Parameters

set_autocommit(False)

# Common type
t_all = Types(name='all', parent=None)
t_all.save()

# Signature
t_signature = Types(name='signature', parent=t_all)
t_signature.save()

signature_type = Attributes(name='type', datatype='char', type=t_signature)
signature_type.save()

signature_id = Attributes(name='id', datatype='float', type=t_signature)
signature_id.save()

signature_price = Attributes(name='price', datatype='float', type=t_signature)
signature_price.save()

signature_image = Attributes(name='image', datatype='char', type=t_signature)
signature_image.save()

signature_description = Attributes(name='description', datatype='char', type=t_signature)
signature_description.save()

# Order
t_order = Types(name='order', parent=t_all)
t_order.save()

order_customer_name = Attributes(name='customer_name', datatype='char', type=t_order)
order_customer_name.save()

order_customer_phone = Attributes(name='customer_phone', datatype='char', type=t_order)
order_customer_phone.save()

order_customer_email = Attributes(name='customer_email', datatype='char', type=t_order)
order_customer_email.save()

order_customer_address = Attributes(name='customer_address', datatype='char', type=t_order)
order_customer_address.save()

order_date = Attributes(name='date', datatype='float', type=t_order)
order_date.save()

order_time_to_call = Attributes(name='time_to_call', datatype='char', type=t_order)
order_time_to_call.save()

order_status = Attributes(name='status', datatype='float', type=t_order)
order_status.save()

order_comment = Attributes(name='comment', datatype='char', type=t_order)
order_comment.save()

order_signature_count_1 = Attributes(name='signature_count_1', datatype='float', type=t_order)
order_signature_count_1.save()

order_signature_count_2 = Attributes(name='signature_count_2', datatype='float', type=t_order)
order_signature_count_2.save()

order_signature_count_3 = Attributes(name='signature_count_3', datatype='float', type=t_order)
order_signature_count_3.save()


def prepare_metadata():
    #Common type
    global t_all, t_signature, signature_type, signature_id, signature_price, signature_image, signature_description
    global t_order, order_customer_name, order_customer_phone, order_customer_email, order_customer_address, order_signature_type
    global order_date, order_time_to_call, order_status, order_comment, order_signature_count_1, order_signature_count_2, order_signature_count_3
    t_all = Types.objects.get(id=12)

    #Signature
    t_signature = Types.objects.get(id=13)

    signature_type = Attributes.objects.get(id=42)
    signature_id = Attributes.objects.get(id=55)
    signature_price = Attributes.objects.get(id=43)
    signature_image = Attributes.objects.get(id=44)
    signature_description = Attributes.objects.get(id=45)

    #Order
    t_order = Types.objects.get(id=14)

    order_customer_name = Attributes.objects.get(id=46)
    order_customer_phone = Attributes.objects.get(id=47)
    order_customer_email = Attributes.objects.get(id=48)
    order_customer_address = Attributes.objects.get(id=49)
    order_signature_type = Attributes.objects.get(id=50)
    order_date = Attributes.objects.get(id=51)
    order_time_to_call = Attributes.objects.get(id=52)
    order_status = Attributes.objects.get(id=53)
    order_comment = Attributes.objects.get(id=54)
    order_signature_count_1 = Attributes.objects.get(id=56)
    order_signature_count_2 = Attributes.objects.get(id=57)
    order_signature_count_3 = Attributes.objects.get(id=58)


def add_signature_type(name, id, price, image, description):
    e_singature = Entities(type=t_signature)
    e_singature.save()
    e_singature_type = Parameters(entity=e_singature, attribute=signature_type, string_value=name)
    e_singature_type.save()
    e_singature_id = Parameters(entity=e_singature, attribute=signature_id, float_value=id)
    e_singature_id.save()
    e_singature_price = Parameters(entity=e_singature, attribute=signature_price, float_value=price)
    e_singature_price.save()
    e_singature_image = Parameters(entity=e_singature, attribute=signature_image, string_value=image)
    e_singature_image.save()
    e_singature_description = Parameters(entity=e_singature, attribute=signature_description, string_value=description)
    e_singature_description.save()


def add_order(name, phone, email='', address='', time_to_call='', comment='', e1=0, e2=0, e3=0):
    e_order = Entities(type=t_order)
    e_order.save()
    e_order_customer_name = Parameters(entity=e_order, attribute=order_customer_name, string_value=name)
    e_order_customer_name.save()
    e_order_customer_phone = Parameters(entity=e_order, attribute=order_customer_phone, string_value=phone)
    e_order_customer_phone.save()
    e_order_customer_email = Parameters(entity=e_order, attribute=order_customer_email, string_value=email or '')
    e_order_customer_email.save()
    e_order_customer_address = Parameters(entity=e_order, attribute=order_customer_address, string_value=address or '')
    e_order_customer_address.save()
    e_order_date = Parameters(entity=e_order, attribute=order_date, float_value=datetime.datetime.now().timestamp())
    e_order_date.save()
    e_order_time_to_call = Parameters(entity=e_order, attribute=order_time_to_call, string_value=time_to_call or '')
    e_order_time_to_call.save()
    e_order_status = Parameters(entity=e_order, attribute=order_status, float_value=0)
    e_order_status.save()
    e_order_comment = Parameters(entity=e_order, attribute=order_comment, string_value=comment or '')
    e_order_comment.save()
    e_order_signature_count_1 = Parameters(entity=e_order, attribute=order_signature_count_1, float_value=e1 or 0)
    e_order_signature_count_1.save()
    e_order_signature_count_2 = Parameters(entity=e_order, attribute=order_signature_count_2, float_value=e2 or 0)
    e_order_signature_count_2.save()
    e_order_signature_count_3 = Parameters(entity=e_order, attribute=order_signature_count_3, float_value=e3 or 0)
    e_order_signature_count_3.save()


#Add signatures

add_signature_type(name="Подпись для физических лиц", id=1, price=1000, image="?", description="описание1")
add_signature_type(name="Подпись для юридических лиц", id=2, price=1200, image="?", description="описание2")
add_signature_type(name="Подпись для индивидуальных предпренимателей", id=3, price=1500, image="?",
                   description="описание3")


#Add orders








