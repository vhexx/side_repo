from django.shortcuts import render

__author__ = 'root'


def index(request):
    return render(request, 'esign/main.html')
