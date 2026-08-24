from rest_framework import serializers

from ..models import SavedChord, Progression, ProgressionChord


class SavedChordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedChord
        fields = ["id", "user", "symbol", "voicing", "date_saved"]
        read_only_fields = ["id", "user", "date_saved"]


class ProgressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progression
        fields = ["id", "user", "title", "created_at", "updated_at"]
        read_only_fields = ["id", "user", "created_at", "updated_at"]


class ProgressionChordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressionChord
        fields = ["id", "progression", "order", "symbol", "voicing"]
        read_only_fields = ["id"]
