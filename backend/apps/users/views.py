from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from apps.users.api.serializers import RegisterSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer
    
class MeView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)