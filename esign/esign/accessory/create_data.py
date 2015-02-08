import django

django.setup()
from esign.models import Types, Attributes, Entities, Parameters

#Common type
t_all = Types(name='all', parent=None)
t_all.save()

#Signature
t_signature = Types(name='signature', parent=t_all)
t_signature.save()

signature_type = Attributes(name='type', datatype='char', type=t_signature)
signature_type.save()

signature_price = Attributes(name='price', datatype='float', type=t_signature)
signature_price.save()

signature_image = Attributes(name='image', datatype='char', type=t_signature)
signature_image.save()

signature_description = Attributes(name='image', datatype='char', type=t_signature)
signature_description.save()

#Order
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

order_signature_type = Attributes(name='signature_type', datatype='float', type=t_order)
order_signature_type.save()

order_date = Attributes(name='date', datatype='float', type=t_order)
order_date.save()

order_time_to_call = Attributes(name='time_to_call', datatype='float', type=t_order)
order_time_to_call.save()

order_status = Attributes(name='status', datatype='float', type=t_order)
order_status.save()

order_comment = Attributes(name='comment', datatype='char', type=t_order)
order_comment.save()





















