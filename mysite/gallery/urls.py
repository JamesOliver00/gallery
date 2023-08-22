from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('likedPictures', views.liked, name='liked'),
    path('saveImgUrl', views.saveImgUrl),
    path('removeImgUrl', views.removeImgUrl)
]