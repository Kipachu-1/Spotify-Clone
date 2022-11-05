from email.policy import default
from django.db import models
from django.contrib.auth.models import User
from . import musicID

class Author(models.Model):
    User = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length = 100)
    uni_id = models.CharField(max_length = 20)
    monthly_listeners = models.IntegerField()
    avatar = models.ImageField(upload_to='images/')
    
    created = models.DateTimeField(auto_now_add=True)


class Music(models.Model):   
    author = models.ForeignKey(Author, on_delete=models.PROTECT)
    name = models.CharField(max_length=100)
    music = models.FileField(upload_to='musics/', null=True, blank=True)
    uni_id = models.CharField(max_length=20, null=True, default=musicID.music_id())
    thumnail = models.ImageField(upload_to='images/', null=True, blank=True)
    genre = models.CharField(max_length=30, default='song')
    
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

class LikedSongs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    musics = models.ManyToManyField(Music)
    uni_id = models.CharField(max_length=30)
    
class FollowedArtist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artists = models.ManyToManyField(Author)
    uni_id = models.CharField(max_length=30)    
    
    
class Playlist(models.Model):
    creator = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=100, default='My playlist', unique=False)
    description = models.TextField(max_length=200, null=True)
    musics = models.ManyToManyField(Music)
    public = models.BooleanField(default=True)
    uni_id = models.CharField(max_length=30, null=True)
    thumnail = models.ImageField(default="images\photo_2022-08-24_01-12-05_lyHjP44.jpg", upload_to='images/', null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    

class User_Playlists(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    playlists = models.ManyToManyField(Playlist)
    uni_id = models.CharField(max_length=30, null=True)
    
class Album(models.Model):
    author = models.CharField(max_length=100)
    musics = models.ManyToManyField(Music)
    description = models.TextField(max_length=200)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    
class Recently_played_playlists(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    playlist_id = models.CharField(max_length=30)
    time_played = models.DateTimeField(auto_now=True)
    
class history(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    last_playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, null=True)
    last_track = models.ForeignKey(Music, on_delete=models.CASCADE, null=True)
    