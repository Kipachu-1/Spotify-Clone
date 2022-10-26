from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('playlist/<str:playlist_id>', views.collection, name='collection'),
    path('collection/tracks', views.librarytracks, name='collectiontracks'),
    path('create/playlist/', views.create_playlist, name='create_playlist'),
    path('create2/playlist/<str:name>', views.create_playlist2, name='create_playlist2'),
    path('collection/playlists', views.library, name='library'),
    path('get/playlist/<str:playlist_id>/info', views.get_playlist_info, name='get_playlist_info'),
    path('get/home/content', views.get_home_content, name='get_home_content'),
    path('get/music/<str:music_id>/info', views.get_music_info, name='get_music_info'),
    path('get/playlists/info', views.get_playlists, name='get_playlists'),
    path('track/<str:music_id>', views.track_page, name='trackpage'),
    path('likedsongs/<str:action>/track/<str:track_id>', views.tolikedsongs, name="addtolikedsongs"),
    path('likedsongs/get/info', views.get_liked_songs, name='get_liked_songs'),
    path("search/", views.rawsearch, name='pagesearch'),
    path("search/<str:question>", views.search, name='search'),
    path('betasearch/<str:question>', views.betasearch, name='betasearch'),
    path('delete/playlist/<str:playlist_id>', views.delete_playlist, name='delete_playlist'),
    path('<str:action>/track/<str:track_id>/playlist/<str:playlist_id>', views.add_song_to_playlist, name='add_song_to_playlist'),
    path('library/<str:action>/playlist/<str:playlist_id>', views.playlist_to_library, name='playlist_to_library'),
    path('history/last/<str:type>/<str:id>', views.history_update, name='history_update'),
    path('history/get/last/', views.history_get, name='history_get'),
    path('playlist/<str:playlist_id>/make/<str:privacytype>', views.changeprivacy, name='changeprivacy'),
    path("register/", views.register, name='signup_page_default'),
    path("login/",views.login_page, name='login_page_default'),
]
