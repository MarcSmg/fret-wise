from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from django.conf import settings

from apps.users.api.serializers import RegisterSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.request import Request
from rest_framework.response import Response

from .models import UserProfile
from .api.serializers import CustomTokenObtainPairSerializer, UserProfileSerializer, UserUpdateSerializer

def parse_boolean(value, default=True):
    if value is None:
        return default

    if isinstance(value, bool):
        return value

    if isinstance(value, str):
        return value.lower() in {"true", "yes", "1", "on"}

def set_refresh_cookie(
    response: Response,
    refresh_token: str,
    *,
    persistent: bool = True,
) -> None:

    cookie_options = {
        "key": settings.REFRESH_TOKEN_COOKIE_NAME,
        "value": refresh_token,
        "httponly": True,
        "secure": settings.REFRESH_TOKEN_COOKIE_SECURE,
        "samesite": settings.REFRESH_TOKEN_COOKIE_SAMESITE,
        "path": settings.REFRESH_TOKEN_COOKIE_PATH,
    }

    if persistent:
        cookie_options["max_age"] = settings.REFRESH_TOKEN_COOKIE_MAX_AGE

    response.set_cookie(**cookie_options)


def delete_refresh_cookie(response: Response):
    response.delete_cookie(
        key=settings.REFRESH_TOKEN_COOKIE_NAME,
        path=settings.REFRESH_TOKEN_COOKIE_PATH,
        samesite=settings.REFRESH_TOKEN_COOKIE_SAMESITE,
    )


class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request: Request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tokens = serializer.validated_data
        refresh_token = tokens["refresh"]
        access_token = tokens["access"]

        remember = parse_boolean(request.data.get("remember", True))

        response = Response(
            {"access": access_token},
            status=status.HTTP_200_OK
        )

        set_refresh_cookie(
            response,
            refresh_token,
            persistent=bool(remember)
        )

        return response


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        rotated_refresh_token = request.COOKIES.get(
            settings.REFRESH_TOKEN_COOKIE_NAME
        )

        if not rotated_refresh_token:
            response = Response(
                {"message": "Refresh token is missing."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
            delete_refresh_cookie(response)
            return response

        serializer = self.get_serializer(
            data={"refresh": rotated_refresh_token}
        )

        try:
            serializer.is_valid(raise_exception=True)
        except:
            response = Response(
                {"message": "Refresh token is invalid or expired"},
                status=status.HTTP_401_UNAUTHORIZED
            )
            delete_refresh_cookie(response)
            return response

        tokens = serializer.validated_data

        access_token = tokens["access"]

        response = Response(
            {"access": access_token},
            status=status.HTTP_200_OK
        )

        rotated_refresh_token = tokens["refresh"]

        set_refresh_cookie(
            response, 
            rotated_refresh_token,
            persistent=True
        )
        
        return response

class LogoutView(APIView):

    def post(self, request):
        refresh_token = request.COOKIES.get(settings.REFRESH_TOKEN_COOKIE_NAME)
        response = Response(status=status.HTTP_205_RESET_CONTENT)
        if refresh_token:
            try:
                RefreshToken(refresh_token).blacklist()
            except Exception:
                pass
        delete_refresh_cookie(response)
        return response
    

class MeView(generics.RetrieveUpdateAPIView):

    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return UserSerializer
        return UserUpdateSerializer

    def get_object(self):
        
        return self.request.user

class UserProfileView(generics.UpdateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):

        obj, _ = UserProfile.objects.get_or_create(user=self.request.user)
        return obj