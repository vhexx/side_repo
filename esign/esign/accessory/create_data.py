import django

django.setup()
from esign.models import Types, Attributes, Entities, Parameters

t_all = Types(name='all', parent=None)
signature = Types(name='signature', parent=t_all)
#
signature_type = Attributes(name='type', datatype='char', type=signature)
signature_price = Attributes(name='price', datatype='float', type=signature)
#
order = Types(name='signature', parent=t_all)
#комментарий
order_customer_name = Attributes(name='customer_name', datatype='char', type=order)
order_customer_phone = Attributes(name='customer_phone', datatype='char', type=order)
order_customer_email = Attributes(name='customer_email', datatype='char', type=order)
order_customer_address = Attributes(name='customer_address', datatype='char', type=order)
order_signature_type = Attributes(name='signature_type', datatype='float', type=order)
order_date = Attributes(name='date', datatype='float', type=order)
order_time_to_call = Attributes(name='time_to_call', datatype='float', type=order)
order_status = Attributes(name='status', datatype='float', type=order)
order_comment = Attributes(name='comment', datatype='char', type=order)





