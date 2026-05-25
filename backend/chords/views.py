from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SavedChord, Progression, ProgressionChord
from .serializers import SavedChordSerializer, ProgressionSerializer, ProgressionChordSerializer
# from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.

class SavedChordViewSet(viewsets.ModelViewSet):
    serializer_class = SavedChordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedChord.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProgressionViewSet(viewsets.ModelViewSet):
    serializer_class = ProgressionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Progression.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["get"])
    def chords(self, request, pk=None):
        progression = self.get_object()
        chords = progression.chords.all().order_by("order")
        serializer = ProgressionChordSerializer(chords, many=True)
        return Response(serializer.data)


class ProgressionChordViewSet(viewsets.ModelViewSet):
    serializer_class = ProgressionChordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = ProgressionChord.objects.filter(
            progression__user=self.request.user
        )

        progression_id = self.request.query_params.get("progression")

        if progression_id:
            queryset = queryset.filter(progression_id=progression_id)

        return queryset