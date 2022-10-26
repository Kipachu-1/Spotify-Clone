from django.contrib import admin
from . import models


admin.site.register(models.LikedSongs)
admin.site.register(models.User_Playlists)
admin.site.register(models.Music)
admin.site.register(models.Playlist)
admin.site.register(models.Author)
admin.site.register(models.Album)
admin.site.register(models.Recently_played_playlists)
admin.site.register(models.history)

