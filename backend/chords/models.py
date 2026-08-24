from django.db import models
from django.conf import settings

# Create your models here.
class SavedChord(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    symbol = models.CharField(max_length=100)

    voicing = models.JSONField()

    date_saved = models.DateTimeField(auto_now_add=True)


class Progression(models.Model):
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    title = models.CharField(max_length=120)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    

class ProgressionChord(models.Model):
    
    progression = models.ForeignKey(Progression, on_delete=models.CASCADE, related_name="chords")
    
    order = models.PositiveIntegerField()
    
    symbol = models.CharField(max_length=100)
    
    voicing = models.JSONField()
    