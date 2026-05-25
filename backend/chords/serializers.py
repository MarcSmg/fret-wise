from rest_framework import serializers
from .models import SavedChord, Progression, ProgressionChord

class SavedChordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedChord
        fields = ["id", "user", "symbol", "date_saved"]

class ProgressionSerializer(serializers.ModelSerializer):

    model = Progression
    fields = ["id", "user", "title", "created_at", "updated_at"]

class ProgressionChordSerializer(serializers.ModelSerializer):

    model = ProgressionChord
    fields = ["id", "progression", "order", "symbol"]
