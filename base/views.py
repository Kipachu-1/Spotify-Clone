from . import models
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .musicID import music_id, playlist_id
from django.db.models import Q
from django.contrib.auth.models import User
import json


@csrf_exempt
@login_required(login_url='login/')
def home(request):
    playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()
    context = {
        'playlists': playlists[:6]
    }
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        thumnail = request.FILES['thumnail']
    return render(request, 'base/home.html', context)
    
@csrf_exempt
def collection(request, playlist_id):
    playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()

    playlist_info = models.Playlist.objects.get(uni_id=playlist_id)
    music_list = playlist_info.musics.all()
    music_count = music_list.count()
    context = {
        'playlists': playlists,
        'data': playlist_info,
        'music_list': music_list,
        'music_count' : music_count
    }
    if request.method == 'POST':
        playlist = models.Playlist.objects.get(uni_id = playlist_id)
        name = request.POST.get('name')
        description = request.POST.get('description')
        try:
            thumnail = request.FILES['thumnail']
            playlist.thumnail = thumnail
        except: 
            pass
        playlist.name = name
        playlist.description = description
        playlist.save()
    if playlist_id == 'tracks':
        return render(request, 'base/collectionL.html', context)
    return render(request, 'base/collection.html', context)


def library(request):
    playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()
    context = {
        'playlists': playlists
    }
    return render(request, 'base/library.html', context)


def librarytracks(request):
    playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()
    playlist_info = models.LikedSongs.objects.get(user=request.user)
    music_list = playlist_info.musics.all()
    music_count = music_list.count()
    context = {
        'playlists': playlists,
        'data': playlist_info,
        'music_list': music_list,
        'music_count' : music_count
    }
    return render(request, 'base/library.html', context)


@login_required
def track_page(request, music_id):
    playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()
    music = models.Music.objects.get(uni_id=music_id)
    context = {'data' : music, 'playlists': playlists, 'type': 'SONG'}
    return render(request, 'base/collection.html', context)




@login_required
def create_playlist(request):
    playlists_list = models.User_Playlists.objects.get(user=request.user)
    uni_id = playlist_id()
    creator = models.User.objects.get(username=request.user.username)
    playlist_created = models.Playlist.objects.create(creator=creator, uni_id=uni_id)
    playlist = models.Playlist.objects.get(uni_id=uni_id)
    playlists_list.playlists.add(playlist)
    return JsonResponse({'name':playlist.name, 'uni_id': uni_id, 'id': playlist.id}, safe=False)



@login_required
def create_playlist2(request, name):
    playlists_list = models.User_Playlists.objects.get(user=request.user)
    uni_id = playlist_id()
    creator = models.User.objects.get(username=request.user.username)
    playlist_created = models.Playlist.objects.create(name=name, creator=creator, uni_id=uni_id)
    playlist = models.Playlist.objects.get(uni_id=uni_id)
    playlists_list.playlists.add(playlist)
    
    
    
@login_required
def get_playlist_info(request, playlist_id):
    data = []
    user_playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()
    Playlist = models.Playlist.objects.get(uni_id=playlist_id)
    musics = Playlist.musics.all()
    music_count = musics.count()
    playlist_info = {
            'creator': Playlist.creator.username,
            'name' : Playlist.name,
            'thumnail' : Playlist.thumnail.url,
            'id' : Playlist.uni_id,
            'description': Playlist.description,
            'ownership': "mine" if Playlist.creator == request.user else "notmine",
            'inLibrary': 'yes' if Playlist in user_playlists else 'no',
            'public': Playlist.public,
        }
    for i in musics:
        data.append({'artist' : i.author.name,
                    'name' : i.name,
                    'id': i.uni_id,
                    'thumnail': i.thumnail.url,
                    'music': i.music.url})
    return JsonResponse({'playlist_info': playlist_info, 'musics': data, 'music_count': music_count}, safe=False)

        
        
        
        
@login_required
def get_liked_songs(request):
    data = []
    Playlist = models.LikedSongs.objects.get(user=request.user)
    musics = Playlist.musics.all()
    music_count = musics.count()
    playlist_info = {
            'creator': Playlist.user.username,
        }
    for i in musics:
        data.append({'artist' : i.author.name,
                    'name' : i.name,
                    'id': i.uni_id,
                    'thumnail': i.thumnail.url,
                    'music': i.music.url})
    return JsonResponse({'playlist_info': playlist_info, 'musics': data, 'music_count': music_count}, safe=False)        
        
        
        
        
        
        
        
   
@login_required
def get_playlists(request):
    data = []
    playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()
    username = request.user.username
    for i in playlists:
        data.append({
            'name' : i.name,
            'id': i.uni_id,
            'thumnail': i.thumnail.url,
            'creator': i.creator.username,
            'username' : username
        })
    return JsonResponse(data, safe=False)
   
   
   
       
@login_required        
def get_home_content(request):
    data = []
    recently_played = models.Recently_played_playlists.objects.filter(user=request.user)
    playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()
    for i in playlists:
            data.append({'name' : i.name,
                        'id': i.uni_id,
                        'thumnail': i.thumnail.url
                        })
    return JsonResponse(data, safe=False)

@login_required
def get_music_info(request, music_id):
    likedsongs = models.LikedSongs.objects.get(user=request.user).musics.all()
    music = models.Music.objects.get(uni_id= music_id)
    liked = 'yes' if music in likedsongs else 'no'
    return JsonResponse([{'music' : music.music.url, 'thumnail' : music.thumnail.url,
                          'name' : music.name, 'artist': music.author.name, 'type': 'song',
                          'id' : music.uni_id, 'authorava': music.author.avatar.url, 'liked':liked}], safe=False)

    
@login_required
def search(request, question):
    get_data = []
    songs  = models.Music.objects.filter(Q(name__icontains=question))
    artists = models.Author.objects.filter(Q(name__icontains=question))
    playlists = models.Playlist.objects.filter(Q(name__icontains=question))
    
    context = {'songs': songs, 
               'artists': artists,
               'playlists': playlists}
    return render(request, 'base/Search.html', context)


@login_required
def rawsearch(request):
    playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()
    context = {
        'playlists': playlists[:6]
    }
    return render(request, 'base/Search.html', context)

@login_required
def tolikedsongs(request, track_id, action):
    Likedsongs = models.LikedSongs.objects.get(user=request.user)
    track = models.Music.objects.get(uni_id=track_id)
    if action == 'add':
        Likedsongs.musics.add(track)
    elif action == 'remove':
        Likedsongs.musics.remove(track)
    return JsonResponse({'result':'success'}, safe=False)
    


@csrf_exempt
def betasearch(request, question=""):
    get_data = {
        'songs': [],
        'playlists': [],
        'artists': []
    }
    songs  = models.Music.objects.filter(Q(name__icontains=question))
    artists = models.Author.objects.filter(Q(name__icontains=question))
    playlists = models.Playlist.objects.filter(Q(name__icontains=question))

    for i in songs:
        get_data['songs'].append({
            'name' : i.name,
            'id' : i.uni_id,
            'artist': i.author.name,
            'thumnail' : i.thumnail.url
        })
    for i in artists:
        get_data['artists'].append({
            'name' : i.name,
            'id' : i.uni_id,
            'thumnail' : i.avatar.url
        })
    for i in playlists:
        get_data['playlists'].append({
            'name' : i.name,
            'id' : i.uni_id,
            'creator': i.creator.username,
            'thumnail' : i.thumnail.url
        })
    
    return JsonResponse(get_data, safe=False)

    
    

def delete_playlist(request, playlist_id):
    models.Playlist.objects.get(uni_id= playlist_id).delete()
    return JsonResponse({'success?': 'yes'}, safe=False)
    
    
def add_song_to_playlist(request, track_id, playlist_id, action):
    track = models.Music.objects.get(uni_id=track_id)
    playlist = models.Playlist.objects.get(uni_id=playlist_id)
    if action =='add':
        playlist.musics.add(track)
    elif action == 'remove':
        playlist.musics.remove(track)
    return JsonResponse({'success?': 'yes'}, safe=False)
    
    
def playlist_to_library(request, action, playlist_id):
    playlist = models.Playlist.objects.get(uni_id=playlist_id)
    library = models.User_Playlists.objects.get(user=request.user)
    if action == 'add':
        library.playlists.add(playlist)
    elif action== 'remove':
        library.playlists.remove(playlist)
    return JsonResponse({'success?': 'yes'}, safe=False)
    
    


def history_update(request, type, id):
    if type == 'track':
        history = models.history.objects.filter(user=request.user)
        track = models.Music.objects.get(uni_id=id)
        history.update(last_track=track)
    elif type == 'playlist':
        history = models.history.objects.filter(user=request.user)
        playlist = models.Playlist.objects.get(uni_id=id)
        history.update(last_playlist=playlist)
    return JsonResponse({'hello' : 'hello'}, safe=False)

def history_get(request):
    history = models.history.objects.get(user=request.user)
    return JsonResponse({'last_track' : history.last_track.uni_id}, safe=False)    
    
def changeprivacy(requestm, playlist_id, privacytype):
    playlist = models.Playlist.objects.get(uni_id=playlist_id)
    if privacytype == 'public':
        playlist.public = True
    else:
        playlist.public = False
    playlist.save()
    return JsonResponse({'success': '0k'}, safe=False)
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
def login_page(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password = password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.add_message(request, messages.ERROR, 'Invalid username or password!')
    return render(request, 'base/login_page2.html')

def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        if password1 == password2:
            new_user = User.objects.create_user(username=username, password=password1)
            user = authenticate(request, username=username, password = password1)
            models.User_Playlists.objects.create(user=new_user)
            models.LikedSongs.objects.create(user=new_user)
            login(request, user)
            return redirect('home')
    return render(request, 'base/SignUp_page.html')       