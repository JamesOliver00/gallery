from django.db import models

# Create your models here.
class Liked(models.Model):
    #id auto created
    urls= models.URLField()