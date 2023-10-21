from django.urls import path
from packhouse import views

urlpatterns=[
    path("dashboard",views.dashboard),
    path("",views.dashboard)
]