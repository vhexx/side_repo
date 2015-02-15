from django.shortcuts import render, render_to_response

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
    return render_with_basket(request, 'esign/ordering.html')


def render_with_basket(request, html):
    if 'basket' in request.session and request.session['basket'] is not None and len(
            request.session['basket']) is not 0:
        return render(request, html, {'basket': request.session['basket']})
    else:
        return render(request, html)