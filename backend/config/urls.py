"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from chords.views import (
    ProgressionChordViewSet,
    ProgressionViewSet,
    SavedChordViewSet
)

router = DefaultRouter()
router.register("saved-chords", SavedChordViewSet, basename="saved-chord")
router.register("progressions", ProgressionViewSet, basename="progression")
router.register(
    "progression-chords",
    ProgressionChordViewSet,
    basename="progression-chord",
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path("api-auth/", include("rest_framework.urls")),
]
