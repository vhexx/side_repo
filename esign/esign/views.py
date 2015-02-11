from django.shortcuts import render

__author__ = 'root'


def index(request):
    return render(request, 'esign/main.html')

def faq(request):
    return render(request, 'esign/faq.html')

def about(request):
    return render(request, 'esign/about.html')

def info(request):
    return render(request, 'esign/info.html')

def order(request):
    return render(request, 'esign/commit_order.html')

def catalog(request):
    return render(request, 'esign/ordering.html')
