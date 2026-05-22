from django.contrib import admin

from .models import Progression, ProgressionChord, SavedChord


@admin.register(SavedChord)
class SavedChordAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "symbol", "date_saved")
    search_fields = ("symbol", "user__username")
    list_filter = ("date_saved",)


@admin.register(Progression)
class ProgressionAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "title", "created_at", "updated_at")
    search_fields = ("title", "user__username")
    list_filter = ("created_at", "updated_at")


@admin.register(ProgressionChord)
class ProgressionChordAdmin(admin.ModelAdmin):
    list_display = ("id", "progression", "order", "symbol")
    search_fields = ("symbol", "progression__title")
    list_filter = ("progression",)

