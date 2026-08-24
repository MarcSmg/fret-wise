from rest_framework.routers import DefaultRouter
from ..views import (
    ProgressionChordViewSet,
    ProgressionViewSet,
    SavedChordViewSet
)

router = DefaultRouter()

router.register("saved-chords", SavedChordViewSet, basename="saved-chords")
router.register("progressions", ProgressionViewSet, basename="progressions")
router.register("progression-chords", ProgressionChordViewSet, basename="progression-chords")

urlpatterns = router.urls