from django.urls import path

from ..views import (
    CustomTokenRefreshView,
    CustomTokenObtainPairView,
    LogoutView,
    MeView,
    RegisterView,
    UserProfileView
)

urlpatterns = [
    path(
        "auth/register/",
        RegisterView.as_view(),
        name="register"
    ),
    path(
        "auth/login/",
        CustomTokenObtainPairView.as_view(),
        name="login"
    ),
    path(
        "auth/logout/", LogoutView.as_view(), 
        name="logout"
    ),
    path(
        "auth/refresh/",
        CustomTokenRefreshView.as_view(),
        name="token_refresh"
    ),
    path(
        "auth/me/",
        MeView.as_view(),
        name="me"
    ),
    path(
        "profile/",
        UserProfileView.as_view(),
        name="profile"
    )
]
