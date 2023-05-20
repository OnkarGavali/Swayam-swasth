from django.urls import path
from packhouse import views

urlpatterns=[
    # path("P1/Today",views.getThisDayP1Data),
    # path("P1/Week",views.getThisWeekP1Data),
    # path("P1/Month",views.getThisMonthP1Data),
    # path("P2/Today", views.getThisDayP2Data),
    # path("P2/Week", views.getThisWeekP2Data),
    # path("P2/Month", views.getThisMonthP2Data),
    # path("P3/Today", views.getThisDayP3Data),
    # path("P3/Week", views.getThisWeekP3Data),
    # path("P3/Month", views.getThisMonthP3Data),
    path("dashboard",views.dashboard),
    path("",views.dashboard)
]