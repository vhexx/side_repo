from django.conf.urls import patterns, include, url
from django.contrib import admin
from esign import views
from esign.accessory import basket

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^faq/', views.faq, name='index'),
    url(r'^about/', views.about, name='index'),
    url(r'^info/', views.info, name='index'),
    url(r'^order/', views.order, name='index'),
    url(r'^catalog/', views.catalog, name='index'),
    url(r'^add_to_basket/', basket.add_to_basket),
    url(r'^drop_basket/', basket.drop_basket),
    url(r'^admin/', include(admin.site.urls)),
)
