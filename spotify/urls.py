from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url/', AuthURL.as_view(), name='get-auth-url'),
    path('redirect/', SpotifyCallback.as_view(), name='spotify-callback'),
    path('is-authenticated/', IsAuthenticated.as_view(), name='is-authenticated'),
    path("current-song", CurrentSong.as_view()),
    path('is-premium-user/', IsPremiumUser.as_view(), name='is-premium-user'),
    path("pause", PauseSong.as_view()),
    path("play", PlaySong.as_view()),
    path("skip", SkipSong.as_view()),
]
