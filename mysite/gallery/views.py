from django.shortcuts import render
from django.http import HttpResponse
from .models import Liked
from random import * 
import json
# Create your views here.
def index(request):
    likedImages = list(Liked.objects.values('urls'))

    return render(request, 'gallery/index.html', {'likedImages': likedImages})

def liked(request):
    likedImages = list(Liked.objects.values('urls'))
    return render(request, 'gallery/likedPictures.html', {'likedImages': likedImages})


def saveImgUrl(request):
    postData=''
    if(request.method =="POST"):
        postData = request.POST['url']
    
    if(postData !=''):
        u = Liked(urls=postData)
        u.save()
        returnData = json.dumps({'success': 'Image was added to Likes...'})
    else:
        returnData = json.dumps({"error":"Not a valid url"})

    return HttpResponse(returnData)

    
def removeImgUrl(request):
    postData=''
    if(request.method =="POST"):
        postData = request.POST['url']
    
    if(postData !=''):
        row = Liked.objects.get(urls=postData)
        row.delete()
        returnData = json.dumps({'success': 'Image was removed from Likes...'})
    else:
        returnData = json.dumps({"error":"Nothing to remove"})
    return HttpResponse(returnData)
