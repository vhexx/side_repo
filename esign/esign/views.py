from django.shortcuts import render
from esign.accessory.db_manager import parse_entities_and_params, t_signature, signature_id
from esign.models import Parameters

__author__ = 'root'


def index(request):
    return render_with_basket(request, 'esign/main.html')


def faq(request):
    return render_with_basket(request, 'esign/faq.html')


def about(request):
    return render_with_basket(request, 'esign/about.html')


def info(request):
    return render_with_basket(request, 'esign/info.html')


def order(request):
    return render_with_basket(request, 'esign/commit_order.html')


def catalog(request):
    data = {'products': parse_entities_and_params(t_signature)[1]}
    return render_with_basket(request, 'esign/buying.html', data)


def render_with_basket(request, html, data=None):
    if data is None:
        data = {}
    print('d:', dict(request.session))
    count, sum, product_list = calc(request)
    print('count:', count)
    data['count'] = count
    data['sum'] = sum
    data['product_list'] = product_list
    return render(request, html, data)


def add_to_basket(request):
    if request.method == 'POST':
        for i in range(1, max_id + 1):
            val = request.POST.get(str(float(i)))
            if val is not None and val is not 0:
                key = str(i)
                if key not in request.session:
                    request.session[key] = val
                else:
                    request.session[key] = int(request.session[key]) + int(val)
                request.session.modified = True
        print('basket:', dict(request.session))
    return catalog(request)


def drop_basket(request):
    request.session.clear()
    return catalog(request)


max_id = 3

# Сессия хранит предварительно выбранные товары в виде prod'id товара' : 'кол-во', например prod1:10,prod2:3


def calc(request):
    # print(dict(request.session))
    count = 0
    sum = 0
    product_list = []
    #print('ses:', dict(request.session))
    for i in range(1, max_id + 1):
        key = str(i)
        if key in request.session:
            sign_entity = Parameters.objects.filter(attribute=signature_id, float_value=float(i))[0].entity
            params = Parameters.objects.filter(entity=sign_entity)
            params_list = tuple(map(lambda p: p.float_value or p.string_value, params))
            # name, id, price, count
            example_count = int(request.session[key])
            price = float(params_list[2])
            product_list.append((str(params_list[0]), str(int(params_list[1])), int(price), str(example_count)))
            count += example_count
            sum += example_count * price
    return int(count), int(sum), product_list