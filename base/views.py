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


@csrf_exempt
@login_required(login_url='login/')
def home(request):
    return render(request, 'base/home.html')
    
@csrf_exempt
@login_required(login_url='login/')
def collection(request, playlist_id):
    if request.method == 'POST':
        playlist = models.Playlist.objects.get(uni_id = playlist_id)
        name = request.POST.get('name')
        description = request.POST.get('descriptiontoplaylist')
        try:
            thumnail = request.FILES['thumnail']
            playlist.thumnail = thumnail
        except: 
            pass
        playlist.name = name[:30]
        playlist.description = description[:200]
        playlist.save()
    return render(request, 'base/home.html')

@login_required(login_url='login/')
def library(request):
    return render(request, 'base/home.html')


@login_required(login_url='login/')
def librarytracks(request):
    return render(request, 'base/home.html')



@login_required(login_url='login/')
def TrackPage(request, music_id):
    return render(request, 'base/home.html')


@login_required(login_url='login/')
def ArtistPage(request, artist_id):
    return render(request, 'base/home.html')



def ArtistInfo(request, artist_id):
    data = []
    artist = models.Author.objects.get(uni_id=artist_id)
    musics = models.Music.objects.filter(author=artist).all()
    artist_info = {
            'name' : artist.name,
            'thumnail' : artist.avatar.url,
            'id' : artist.uni_id
        }
    for i in musics:
        data.append({'artist' : i.author.name,
                    'name' : i.name,
                    'id': i.uni_id,
                    'thumnail': i.thumnail.url,
                    'music': i.music.url,
                    'artist_id': i.author.uni_id})
    return JsonResponse({'artist_info': artist_info, 'musics': data}, safe=False)




def CreatePlaylist(request):
    playlists_list = models.User_Playlists.objects.get(user=request.user)
    uni_id = playlist_id()
    creator = models.User.objects.get(username=request.user.username)
    playlist_created = models.Playlist.objects.create(creator=creator, uni_id=uni_id)
    playlists_list.playlists.add(playlist_created)
    return JsonResponse({'name':playlist_created.name, 'uni_id': uni_id, 'id': playlist_created.id}, safe=False)



def CreatePlaylist2(request, name):
    playlists_list = models.User_Playlists.objects.get(user=request.user)
    uni_id = playlist_id()
    creator = models.User.objects.get(username=request.user.username)
    playlist_created = models.Playlist.objects.create(name=name, creator=creator, uni_id=uni_id)
    playlists_list.playlists.add(playlist_created)
    return JsonResponse({'success': 'yes'}, safe=False)
    
    
def GetPlaylistInfo(request, playlist_id):
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
                    'music': i.music.url,
                    'artist_id': i.author.uni_id})
    return JsonResponse({'playlist_info': playlist_info, 'musics': data, 'music_count': music_count}, safe=False)

        
def GetLikedSongs(request):
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
                    'music': i.music.url,
                    'artist_id': i.author.uni_id})
    return JsonResponse({'playlist_info': playlist_info, 'musics': data, 'music_count': music_count}, safe=False)        
        
        
        
def GetLikedSongsList(request):
    data = []
    Playlist = models.LikedSongs.objects.get(user=request.user)
    musics = Playlist.musics.all()
    for i in musics:
        data.append(i.uni_id)
    return JsonResponse(data, safe=False)  
        
        

def FollowedArtistsInfo(request):
    data = []
    artists = models.FollowedArtist.objects.get(user=request.user).artists.all()
    for i in artists:
        data.append({
            'name' : i.name,
            'id': i.uni_id,
            'thumnail': i.avatar.url,
        })
    return JsonResponse(data, safe=False)

def FollowedArtistsList(request):
    data = []
    artists = models.FollowedArtist.objects.get(user=request.user).artists.all()
    for i in artists:
        data.append(i.uni_id)
    return JsonResponse(data, safe=False)


def updateFollowedArtistslist(request, action, artist_id):
    artists = models.FollowedArtist.objects.get(user=request.user).artists
    artist = models.Author.objects.get(uni_id=artist_id)
    if action == 'remove':
        artists.remove(artist)
    else:
        artists.add(artist)
    return JsonResponse({'result':'Action completed'}, safe=False)
   

def GetPlaylists(request):
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
   

def RecPlaylists(request):
    data = []
    playlists = models.Playlist.objects.all()[:10]
    for i in playlists:
        data.append({
            'name' : i.name,
            'id': i.uni_id,
            'thumnail': i.thumnail.url,
            'creator': i.creator.username,
        })
    return JsonResponse(data, safe=False)   
   
       
      
def GetHomeContent(request):
    data = []
    recently_played = models.Recently_played_playlists.objects.filter(user=request.user)
    playlists = models.Playlist.objects.all().order_by('-created')[:10]
    for i in playlists:
            data.append({'name' : i.name,
                        'id': i.uni_id,
                        'thumnail': i.thumnail.url
                        })
    return JsonResponse(data, safe=False)

def GetTrackInfo(request, music_id):
    likedsongs = models.LikedSongs.objects.get(user=request.user).musics.all()
    music = models.Music.objects.get(uni_id= music_id)
    return JsonResponse([{'music' : music.music.url, 'thumnail' : music.thumnail.url,
                          'name' : music.name, 'artist': music.author.name, 'type': 'song',
                          'id' : music.uni_id, 'authorava': music.author.avatar.url, 'artist_id':music.author.uni_id}], safe=False)

    
def Search(request, question):
    get_data = []
    songs  = models.Music.objects.filter(Q(name__icontains=question))
    artists = models.Author.objects.filter(Q(name__icontains=question))
    playlists = models.Playlist.objects.filter(Q(name__icontains=question))
    
    context = {'songs': songs, 
               'artists': artists,
               'playlists': playlists}
    return render(request, 'base/home.html', context)


def RawSearch(request):
    return render(request, 'base/home.html')

def UpdateLikedSongs(request, track_id, action):
    Likedsongs = models.LikedSongs.objects.get(user=request.user)
    track = models.Music.objects.get(uni_id=track_id)
    if action == 'add':
        Likedsongs.musics.add(track)
    elif action == 'remove':
        Likedsongs.musics.remove(track)
    return JsonResponse({'result':'success'}, safe=False)
    


@csrf_exempt
def BetaSearch(request, question=""):
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


def DeletePlaylist(request, playlist_id):
    models.Playlist.objects.get(uni_id= playlist_id).delete()
    return JsonResponse({'success?': 'yes'}, safe=False)
    
    
def UpdatePlaylistList(request, track_id, playlist_id, action):
    track = models.Music.objects.get(uni_id=track_id)
    playlist = models.Playlist.objects.get(uni_id=playlist_id)
    if action =='add':
        playlist.musics.add(track)
    elif action == 'remove':
        playlist.musics.remove(track)
    return JsonResponse({'success?': 'yes'}, safe=False)
    
    
def UpdateLibrary(request, action, playlist_id):
    playlist = models.Playlist.objects.get(uni_id=playlist_id)
    library = models.User_Playlists.objects.get(user=request.user)
    if action == 'add':
        library.playlists.add(playlist)
    elif action== 'remove':
        library.playlists.remove(playlist)
    return JsonResponse({'success?': 'yes'}, safe=False)
    
    
def HistoryUpdate(request, type, id):
    if type == 'track':
        history = models.history.objects.filter(user=request.user)
        track = models.Music.objects.get(uni_id=id)
        history.update(last_track=track)
    elif type == 'playlist':
        history = models.history.objects.filter(user=request.user)
        playlist = models.Playlist.objects.get(uni_id=id)
        history.update(last_playlist=playlist)
    return JsonResponse({'hello' : 'hello'}, safe=False)

def GetHistory(request):
    try:
        history = models.history.objects.get(user=request.user)
        return JsonResponse({'last_track' : history.last_track.uni_id}, safe=False)
    except:
        return JsonResponse({'last_track' : 'no'}, safe=False)
    
def ChangePlaylistPrivacy(requestm, playlist_id, privacytype):
    playlist = models.Playlist.objects.get(uni_id=playlist_id)
    if privacytype == 'public':
        playlist.public = True
    else:
        playlist.public = False
    playlist.save()
    return JsonResponse({'success': '0k'}, safe=False)
        
        
       
def LoginPage(request):
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

def RegisterPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        if password1 == password2:
            new_user = User.objects.create_user(username=username, password=password1)
            user = authenticate(request, username=username, password = password1)
            models.User_Playlists.objects.create(user=new_user, uni_id=playlist_id())
            models.LikedSongs.objects.create(user=new_user,uni_id = playlist_id())
            models.FollowedArtist.objects.create(user=new_user,uni_id = playlist_id())
            login(request, user)
            return redirect('home')
    return render(request, 'base/SignUp_page.html')       