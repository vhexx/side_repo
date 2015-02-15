from django.shortcuts import render
from esign import views

__author__ = 'root'

max_id = 3


def add_to_basket(request):
    if request.method == 'POST':
        # if 'basket' not in request.session or request.session['basket'] is None:
        #            request.session['basket'] = {}
        for i in range(1, max_id + 1):
            val = request.POST.get(str(i))
            if val is not None and val is not 0:
                if str(i) not in request.session:
                    request.session[str(i)] = val
                else:
                    request.session[str(i)] = int(request.session[str(i)]) + int(val)
                request.session.modified = True
                print(i,':',request.session[str(i)])
    return render(request, 'esign/ordering.html')


def drop_basket(request):
    # print('basket before:', request.session['basket'])
    #    request.session['basket'] = {}
    #    print('basket after:', request.session['basket'])
    request.session['1'] = 0
    request.session['2'] = 0
    request.session['3'] = 0
    return views.catalog(request)