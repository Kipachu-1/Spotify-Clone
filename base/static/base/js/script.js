let view_container_content = document.getElementById('view_container_content')
let user = document.getElementById('user_icon');
let playlist_add = document.getElementById('plus_btn');
let playlist_list = document.getElementById('playlist_list');
let library_btn = document.getElementById('library_btn');
let clickplaylistblock  = document.querySelectorAll('.name_playlist_block');
let navbar = document.getElementById('nav_bar');
let details = document.querySelector('.details');
let navplaylistlists = document.getElementById('playlist_list');
let navactbtns = document.getElementById('act_btns');
let editbar = document.getElementById('editbar');
let editbtn = document.getElementById('editbtn');
let closebtnwd = document.getElementById('closebtnwd');
let main = document.getElementById('main');
let details_inner = document.querySelector('.details_inner');
let music_thumnail_img = document.querySelector('.music_thumnail_img');
let upbtns = document.querySelector(".upbtns");
let track_info = document.querySelector('.track-info')
let details_track_name = document.querySelector('.track-name');
let details_track_artist = document.querySelector('.track-artist');
let main_info_btns = document.getElementById('main_info');
let main_info_btns701 = document.getElementById('main_info701');
let details_inner_img_container = document.querySelector('.details-inner-img-container');
let player_wrapper = document.querySelector('.wrapper');
let slider_container_volume = document.querySelector('.slider_container_volume');
let yourlibrarylink = document.getElementById('yourlibrarylink');
let tapbar = document.querySelector('.tapbar');
let closeplayer = document.querySelector('.closeplayer');
let clickareaclose = document.querySelector('.clickareaclose');
let homelink = document.getElementById('homelink');
let likedbtnnav = document.getElementById('liked_btn')
let searchinput = document.getElementById('searchinput');
let searchlink = document.getElementById('searchlink');
let search_bar = document.getElementById('search-bar');
let root_top_bar = document.getElementById('root_top_bar');
let last_child = view_container_content.lastElementChild ;
let playpause_btn_closed = document.querySelector('.play-pause-btn')
let playerlikedbtn = document.querySelector('.playerlikedbtn');
last_child.classList.add('container_block_last');
let actionbtn = document.querySelector('.actionbtn');





likedbtnnav.addEventListener('click', ()=>{
    clear_view_content();
    collection_likedsongs();
})


playlist_add.addEventListener('click', async function(){
    let response = await (await fetch("http://10.48.135.243:5000/create/playlist/")).json();
    let new_playlist_block = document.createElement('div');
    new_playlist_block.classList.add('playlist_block');
    new_playlist_block.dataset.id = response['uni_id'];
    new_playlist_block.innerHTML = `<div class='subblock'><h1 class='playlist_name'>${response['name']}</h1></div>`;
    playlist_list.appendChild(new_playlist_block);
    new_playlist_block.addEventListener('click', async function(){
        window.history.pushState({}, '', `http://10.48.135.243:5000/playlist/${response['uni_id']}`);
        clear_view_content();
        collection_content(this.dataset.id, 'Playlist');
    })
})


function addtoplaylist_list(data){
    let new_playlist_block = document.createElement('div');
    new_playlist_block.classList.add('playlist_block');
    new_playlist_block.dataset.id = data['id'];
    new_playlist_block.innerHTML = `<div class='subblock'><h1 class='playlist_name'>${data['name']}</h1></div>`;
    playlist_list.appendChild(new_playlist_block);
    new_playlist_block.addEventListener('click', async function(){
        window.history.pushState({}, '', `http://10.48.135.243:5000/playlist/${data['id']}`);
        clear_view_content();
        collection_content(data['id'], 'Playlist');
    })
}



window.addEventListener("touchstart", touchHandler, false);
function touchHandler(event){
    if(event.touches.length > 1){
        event.preventDefault()
    }
}

window.addEventListener('load', function(e) {
    setTimeout(function() { window.scrollTo(0, 1); }, 1);
  }, 0);

// document.addEventListener('dblclick', ()=>{
//     if (document.documentElement.requestFullscreen) {
//       main.requestFullscreen();/* Safari */
//       main.webkitRequestFullscreen();
//       main.msRequestFullscreen();
//       }
// })



homelink.addEventListener('click', ()=> {
    window.history.pushState({}, '', `http://10.48.135.243:5000`);
    clear_view_content();
    home_content();
    other_block_content_home('Made for you');
    other_block_content_home('Based on recent listening');
})



user.addEventListener('click', ()=> {
    window.history.pushState({}, '', `http://10.48.135.243:5000`);
    clear_view_content();
    home_content();
    other_block_content_home('Made for you');
    other_block_content_home('Based on recent listening');
})


// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    navbar.classList.add('hidden-nav-bar');
        slider_container_volume.remove();
        player_wrapper.appendChild(main_info_btns701);
        player_wrapper.appendChild(slider_container_volume);
    main_info_btns.classList.add('main-info-hidden');
    clickareaclose.addEventListener('click', ()=>{
        if(window.innerWidth < 700)
        {show_mus();
        clickareaclose.style.zIndex = '100';}
    });
    closeplayer.addEventListener('click', ()=> {
        hide_mus();
        clickareaclose.style.zIndex = '110';
    });
    function forsearchbar(){
        if(window.location.href.includes('search')) {
            root_top_bar.style.display = 'flex';
        } else {
            if(window.innerWidth < 700){root_top_bar.style.display = 'none';}
        }
    }
    forsearchbar();

} else {
    main_info_btns701.remove();
    playpause_btn_closed.remove();
    clickareaclose.remove();
    editbar.remove();
    main_info_btns.remove();
    slider_container_volume.remove();
    player_wrapper.appendChild(main_info_btns);
    player_wrapper.appendChild(slider_container_volume);
    tapbar.remove();
    searchinput.addEventListener('click', ()=> {
        searchpage();
        AcivateSearch();
        if(window.location.href.includes('search') == false) {
        window.history.pushState({}, '', `http://10.48.135.243:5000/search/`);
        forsearchbar();
     }
    })
}

yourlibrarylink.addEventListener('click', async function(){
    if(window.location.href != 'http://10.48.135.243:5000/collection/playlists') {
    window.history.pushState({}, '', `http://10.48.135.243:5000/collection/playlists`);
    clear_view_content();
    other_block_content();}
})



searchlink.addEventListener('click', function(){
    searchpage();
    AcivateSearch();
    if(window.location.href.includes('search') == false) {
    window.history.pushState({}, '', `http://10.48.135.243:5000/search/`);
    forsearchbar();
 }
})








if (window.location.href.includes('/track/')) {
    let trackplaybtn = document.getElementById('playbtn');
    trackplaybtn.addEventListener('click', async function() {
        let music = await fetch(`/get/music/${this.dataset.id}/info`);
        let data = await music.json();
        music_list = await data;

        loadTrack(track_index);
        playTrack();
    });
}





if (window.location.href.includes('playlist/')) {
    let colplaymusbtn = document.querySelectorAll('.playmusbtn');
    let colplayplaylist = document.getElementById('playbtn');
    colplayplaylist.addEventListener('click', async function(){
        let playlist_data = await fetch(`/get/playlist/${this.dataset.id}/info`);
        let data = await playlist_data.json();
        music_list = data['musics'];
        loadTrack(track_index);
        playTrack();
    })
    colplaymusbtn.forEach(item => {item.addEventListener('click', async function() {
        let music = await fetch(`/get/music/${this.dataset.id}/info`);
        let data = await music.json();
        music_list = await data;

        loadTrack(track_index);
        playTrack();
    });
});
};
window.onload = function(){
    // if (window.location.pathname = '/') {
    //     window.history.pushState({}, '', `http://10.48.135.243:5000/search/`);
    //     clear_view_content();
    //     home_content();
    // }
    if (window.location.href.includes('/playlist/')) {
        let location = window.location.href;
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Playlist');
    } else if(window.location.href.includes('/collection/tracks')) {
        clear_view_content()
        collection_likedsongs()
    } else if (window.location.href.includes('/collection/playlists')) {
        clear_view_content();
        other_block_content();
    } else if (window.location.href.includes('/track/')) {
        let location = window.location.href;
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Track'); 
    } else if (window.location.href.includes('/search/')) {
        searchpage();
        AcivateSearch();
    } 
}



function hide_show_navbar(){
    if (navbar.classList.contains('hidden-nav-bar')) {
        navbar.classList.remove('hidden-nav-bar');
        navbar.classList.add('show-nav-bar');
    } else if (navbar.classList.contains('show-nav-bar')) {
        navbar.classList.remove('show-nav-bar');
        navbar.classList.add('hidden-nav-bar');
    }
}
function show_mus(){
    if (details.classList.contains('details-close')) {
        details.classList.remove('details-close');
        details.classList.add('details-open');
        details_inner.classList.add('details-inner-open');
        music_thumnail_img.classList.add('music_thumnail_img_open');
        upbtns.classList.add('show-upbtns');
        track_info.classList.add('track-info-open');
        details_track_name.classList.add('track-name-open');
        details_track_artist.classList.add('track-artist-open');
        main_info_btns.classList.remove('main-info-hidden');
        details_inner_img_container.classList.add('details-inner-img-container-open');
        closeplayer.classList.add('closeplayer-open');
        playpause_btn_closed.remove();
        tapbar.style.bottom = '-50px';
        playerlikedbtn.style.display = 'block';
    } }
function hide_mus(){
    if (details.classList.contains('details-open')) {
        details.classList.remove('details-open');
        details.classList.add('details-close');
        details_inner.classList.remove('details-inner-open');
        music_thumnail_img.classList.remove('music_thumnail_img_open');
        upbtns.classList.remove('show-upbtns');
        track_info.classList.remove('track-info-open');
        details_track_name.classList.remove('track-name-open');
        details_track_artist.classList.remove('track-artist-open');
        main_info_btns.classList.add('main-info-hidden');
        details_inner_img_container.classList.remove('details-inner-img-container-open');
        closeplayer.classList.remove('closeplayer-open');
        player_wrapper.appendChild(playpause_btn_closed);
        tapbar.style.bottom = '0';
        playerlikedbtn.style.display = 'none';
    }}


// screen.orientation.lock("portrait");
// screen.lockOrientation("orientation");


















library_btn.addEventListener('click', async function(){
    window.history.pushState({}, '', `http://10.48.135.243:5000/collection/playlists`);
    clear_view_content();
    other_block_content();
})

clickplaylistblock.forEach(item => {
    item.addEventListener('click', async function(){
        window.history.pushState({}, '', `http://10.48.135.243:5000/playlist/${this.dataset.id}`);
        clear_view_content();
        collection_content(this.dataset.id, 'Playlist');
    })
});


document.querySelectorAll('.playlist_block').forEach(item => {
    item.addEventListener('click', async function(){
        window.history.pushState({}, '', `http://10.48.135.243:5000/playlist/${this.dataset.id}`);
        clear_view_content();
        collection_content(this.dataset.id, 'Playlist');
    })
});

document.querySelectorAll('.playbtn_block').forEach(item => {
    item.addEventListener('click', async function(){
        let playlist_data = await fetch(`/get/playlist/${this.dataset.id}/info`);
        let data = await playlist_data.json();
        music_list = data['musics'];
        loadTrack(track_index);
        playTrack();

    })
});


// document.addEventListener('DOMContentLoaded', function() {
//     window.history.replaceState({}, '', 'http://localhos:5000');
// });



// ================================Navigation pages===============================


window.onpopstate = function(){
    try {
    forsearchbar(); }
    catch {}
    if (window.location.href.includes('/playlist/')) {
        let location = window.location.href;
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Playlist');
    } else if (window.location.href.includes('/search/')) {
        searchpage();
    } else if (window.location.href.includes('/collection/playlists')) {
        clear_view_content();
        other_block_content();
    } else if (window.location.href.includes('/track/')) {
        let location = window.location.href;
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Track'); 
    } else if (window.location.href = 'http://10.48.135.243:5000') {
        clear_view_content();
        home_content();
    }
}


// =====================================Functions ==================================

window.ondragstart = function() { return false; }




let type = 'songs'
function AcivateSearch() {
    let types = document.querySelectorAll('.type-btn');
    searchinput.addEventListener('keyup', async function(){
        window.history.replaceState({}, '', `http://10.48.135.243:5000/search/${this.value}`);
        if(this.value != "") {
        var get_data = await (await fetch(`/betasearch/${this.value}`)).json();
        }
        search_result(get_data, type);
        types[0].addEventListener('click', ()=> {
            search_result(get_data, 'songs');
            type = 'songs';
            types[0].style.color = 'white'
            types[1].style.color = 'black'
            types[2].style.color = 'black'
            types[0].style.backgroundColor = '#8758FF'
            types[1].style.backgroundColor = 'white'
            types[2].style.backgroundColor = 'white'
    
        })
        types[1].addEventListener('click', ()=> {
            search_result(get_data, 'playlists');
            type = 'playlists';
            types[0].style.color = 'black'
            types[1].style.color = 'white'
            types[2].style.color = 'black'
            types[0].style.backgroundColor = 'white'
            types[1].style.backgroundColor = '#8758FF'
            types[2].style.backgroundColor = 'white'
    
        })
        types[2].addEventListener('click', ()=> {
            search_result(get_data, 'artists');
            type = 'artists';
            types[0].style.color = 'black'
            types[1].style.color = 'black'
            types[2].style.color = 'white'
            types[0].style.backgroundColor = 'white'
            types[1].style.backgroundColor = 'white'
            types[2].style.backgroundColor = '#8758FF'
        })
    })
}






function searchpage(){
    clear_view_content();
    let search_bar = document.createElement('div');
    search_bar.classList.add('search-bar');
    let list_types = document.createElement('div');
    list_types.classList.add('list-types');
    let type_btn1 = document.createElement('div');
    type_btn1.classList.add('type-btn');
    let type_btn2 = document.createElement('div');
    type_btn2.classList.add('type-btn');
    let type_btn3 = document.createElement('div');
    type_btn3.classList.add('type-btn');
    type_btn1.innerHTML = '<p>Songs</p>';
    type_btn2.innerHTML = '<p>Playlists</p>';
    type_btn3.innerHTML = '<p>Artists</p>';
    let search_list = document.createElement('div');
    search_list.classList.add('search_list');
    search_list.classList.add('song_list');
    view_container_content.appendChild(search_bar);
    view_container_content.appendChild(list_types);
    view_container_content.appendChild(search_list);
    list_types.appendChild(type_btn1);
    list_types.appendChild(type_btn2);
    list_types.appendChild(type_btn3);
}


async function search_result(data, type){
    let search_list = document.querySelector('.search_list');
    search_list.innerHTML = '';
    for(let i = 0; i < data[type].length; i++) {
    let music_block = document.createElement('div');
    music_block.classList.add('music_block');
    let thumnail  = document.createElement('div');
    thumnail.classList.add('thumnail');
    let thumnail_img = document.createElement('img');
    thumnail_img.src = data[type][i]['thumnail'];
    let music_info = document.createElement('div');
    let music_name = document.createElement('p');
    let music_author = document.createElement('p');
    music_name.innerText = data[type][i]['name'];
    if (type == 'playlists') {
    music_author.innerText = data[type][i]['creator']; 
    } else {
    music_author.innerText = data[type][i]['artist']; 
    }
    music_info.classList.add('music_info');
    music_name.classList.add('music_name');
    music_author.classList.add('music_author');
    music_author.classList.add('search_name');
    music_author.classList.add('search_author');
    music_block.appendChild(thumnail);
    music_block.appendChild(music_info);
    thumnail.appendChild(thumnail_img);
    music_info.appendChild(music_name);
    music_info.appendChild(music_author);
    search_list.appendChild(music_block);
    music_block.dataset.id = data[type][i]['id'];
    music_block.addEventListener('click', async function (){
        clear_view_content();
        if(type == 'songs') {
        window.history.pushState({}, '', `http://10.48.135.243:5000/track/${this.dataset.id}`);
        collection_content(`${this.dataset.id}`, "Track"); }
        else if (type == 'playlists') {
        window.history.pushState({}, '', `http://10.48.135.243:5000/playlist/${this.dataset.id}`);
        collection_content(`${this.dataset.id}`, "Playlist"); 
        } else if(type == 'artists') {
        window.history.pushState({}, '', `http://10.48.135.243:5000/artist/${this.dataset.id}`);
        collection_content(`${this.dataset.id}`, "Artist"); 
        }
    })
    }
}


async function delete_playlist(playlist_id) {
    let action = await fetch(`/delete/playlist/${playlist_id}`);
}




async function addtoplaylistcontent(track_id) {
    let data = await (await fetch('http://10.48.135.243:5000/get/playlists/info')).json();
    let ReactModalPortal = document.createElement('div');
    ReactModalPortal.classList.add('ReactModalPortal');
    ReactModalPortal.style.top = '300%';
    main.appendChild(ReactModalPortal);
    sleep(100).then(()=>{
        ReactModalPortal.style.top='0';
    })
    let addcontent = document.createElement('div');
    let action_detail = document.createElement('div');
    let cancel_btn_add = document.createElement('div');
    let playlistslist = document.createElement('div');
    addcontent.classList.add('addcontent');
    action_detail.classList.add('action_detail');
    cancel_btn_add.classList.add('cancel-btn-add');
    playlistslist.classList.add('playlistslist');

    action_detail.innerHTML = '<p>Add to Playlist</p>';
    cancel_btn_add.innerHTML = '<p>Cancel</p>';
    addcontent.appendChild(action_detail);
    addcontent.appendChild(cancel_btn_add);
    addcontent.appendChild(playlistslist);

    for(let i = 0; i <  data.length; i++) {
        if(data[i]['username'] == data[i]['creator']) {
        let playlist_block = document.createElement('div');
        let playlist_block_add_img = document.createElement('div');
        let playlist_block_add_info = document.createElement('div');
        playlist_block.classList.add('playlist-block');
        playlist_block_add_img.classList.add('playlist-block-add-img');
        playlist_block_add_info.classList.add('playlist-block-add-info');
        playlist_block_add_img.innerHTML =  `<img src="${data[i]['thumnail']}" alt=""></img>`
        playlist_block_add_info.innerHTML = `<div class="playlist-block-name"><p>${data[i]['name']}</p></div><div class="playlist-block-details"><p>By ${data[i]['creator']}</p></div>`;
        playlist_block.appendChild(playlist_block_add_img);
        playlist_block.appendChild(playlist_block_add_info);
        playlistslist.appendChild(playlist_block);
        playlist_block.addEventListener('click', async ()=>{
            let addto = await fetch(`http://10.48.135.243:5000/add/track/${track_id}/playlist/${data[i]['id']}`)
            ReactModalPortal.remove();
            editbar.classList.remove('edit-bar-show');
            editbar.classList.add('edit-bar-hidden');
        })}
    }
    ReactModalPortal.appendChild(addcontent);
    cancel_btn_add.addEventListener('click', ()=>{
        ReactModalPortal.style.top = '300%';
        sleep(100).then(()=>{
            ReactModalPortal.remove();
        })
    })
}

async function removefromplaylist(track_id, playlist_id) {
    await fetch(`http://10.48.135.243:5000/remove/track/${track_id}/playlist/${playlist_id}`)
    editbar.classList.remove('edit-bar-show');
    editbar.classList.add('edit-bar-hidden');
}



function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


async function actioncontent(uni_id, type, data_info) {
    if(type == "Track") {
        var data = data_info[0]}
    else if(type=='Playlist') {
        var data = data_info['playlist_info'];
    }
    let editbarcontainer = document.createElement('div');
    let edit_container = document.createElement('div');
    let edit_img = document.createElement('div');
    let edit_img_div = document.createElement('div');
    let edit_img_div_img = document.createElement('img');
    let editacts = document.createElement('div');
    let closebtn = document.createElement('div');
    let closebtnwd = document.createElement('p');
    let name_div = document.createElement('div');
    let name_p = document.createElement('p');
    closebtn.setAttribute('id', 'closebtn');
    editacts.setAttribute('id', 'editacts');
    editbarcontainer.setAttribute('id', 'editbarcontainer');
    edit_img.setAttribute('id', 'edit_img');
    edit_container.setAttribute('id', 'edit_container');
    closebtnwd.setAttribute('id', 'closebtnwd');
    name_div.appendChild(name_p);
    name_p.innerText = data['name']
    closebtnwd.innerText = 'Close'
    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        })
    closebtn.appendChild(closebtnwd);
    editbar.appendChild(editbarcontainer);
    editbarcontainer.appendChild(edit_container);
    editbar.appendChild(closebtn);

    editbarcontainer.appendChild(editacts);
    edit_container.appendChild(edit_img);
    edit_container.appendChild(name_div);
    edit_img.appendChild(edit_img_div);
    edit_img_div.appendChild(edit_img_div_img);
    edit_img_div_img.setAttribute('src', data['thumnail']);





    if(type == 'Playlist') { 
    if(data['ownership'] == 'mine') {
    let btn_addsongs = document.createElement('div');
    let btn_edit = document.createElement('div');
    let btn_makeprivate = document.createElement('div');
    let btn_removefromprofile = document.createElement('div');
    let btn_deleteplaylist = document.createElement('div');
    btn_addsongs.classList.add('editactbtn');
    btn_addsongs.setAttribute('id', 'btn_addsongs');
    btn_edit.classList.add('editactbtn');
    btn_edit.setAttribute('id', 'btn_edit');
    btn_makeprivate.classList.add('editactbtn');
    btn_makeprivate.setAttribute('id', 'btn_makeprivate');
    btn_removefromprofile.classList.add('editactbtn');
    btn_removefromprofile.setAttribute('id', 'btn_removefromprofile');
    btn_deleteplaylist.classList.add('editactbtn');
    btn_deleteplaylist.setAttribute('id', 'btn_deleteplaylist');
    btn_addsongs.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/plus.svg' alt=''></div><div><p>Add songs</p></div>"
    btn_edit.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/pen.svg' alt=''></div><div><p>Edit</p></div>"

    if(data['public'] == false) {
    btn_makeprivate.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/lock.svg' alt=''></div><div><p>Make Public</p></div>"
    btn_makeprivate.addEventListener('click', async ()=>{
        let action  = await fetch(`http://10.48.135.243:5000/playlist/${data['id']}/make/public`)
    })
    } else if(data['public'] == true) {
    btn_makeprivate.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/lock.svg' alt=''></div><div><p>Make Private</p></div>"
    btn_makeprivate.addEventListener('click', async ()=>{
        let action  = await fetch(`http://10.48.135.243:5000/playlist/${data['id']}/make/private`)})
    }
    btn_removefromprofile.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/profile.svg' alt=''></div><div><p>Remove from profile</p></div>"
    btn_deleteplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/minus.svg' alt=''></div><div><p>Delete Playlist</p></div>"
    editacts.appendChild(btn_addsongs);
    editacts.appendChild(btn_edit);
    editacts.appendChild(btn_makeprivate);
    editacts.appendChild(btn_removefromprofile);
    editacts.appendChild(btn_deleteplaylist);

    btn_makeprivate.addEventListener('click', ()=> {
        editbar.classList.remove('edit-bar-show');
            editbar.classList.add('edit-bar-hidden');
    })

    
    btn_edit.addEventListener('click', ()=> {
        open_edit_details(data);
    });
    btn_deleteplaylist.addEventListener('click', ()=> {
        delete_playlist(data['id']);  
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        window.history.replaceState({}, '', `http://10.48.135.243:5000/collection/playlists`);
        clear_view_content();
        other_block_content();
    });
    } else {
        if (data['inLibrary'] == 'no') {
        let btn_addtolibrary = document.createElement('div');
        btn_addtolibrary.classList.add('editactbtn');
        btn_addtolibrary.setAttribute('id', 'btn_addtolibrary');
        btn_addtolibrary.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/plus.svg' alt=''></div><div><p>Add to library</p></div>"
        editacts.appendChild(btn_addtolibrary);
        btn_addtolibrary.addEventListener('click', async ()=>{
            let addtolibrary = await fetch(`http://10.48.135.243:5000/library/add/playlist/${data['id']}`)
            editbar.classList.remove('edit-bar-show');
            editbar.classList.add('edit-bar-hidden');
        }) 
    }
        else if(data['inLibrary'] == 'yes') {
            let btn_removefromlibrary = document.createElement('div');
            btn_removefromlibrary.classList.add('editactbtn');
            btn_removefromlibrary.setAttribute('id', 'btn_removefromlibrary');
            btn_removefromlibrary.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/minus.svg' alt=''></div><div><p>Remove from My Library</p></div>"
            editacts.appendChild(btn_removefromlibrary);
            btn_removefromlibrary.addEventListener('click', async ()=>{
                let removefromlibrary = await fetch(`http://10.48.135.243:5000/library/remove/playlist/${data['id']}`);
                editbar.classList.remove('edit-bar-show');
                editbar.classList.add('edit-bar-hidden');
            }) 
        }
    }
    } else if(type == 'Track') {
        let btn_like = document.createElement('div');
        let btn_addtoplaylist = document.createElement('div');
        btn_like.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/heart.svg' alt=''></div><div><p>Like</p></div>"
        btn_addtoplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/add-music.svg' alt=''></div><div><p>Add to playlist</p></div>"
        btn_addtoplaylist.addEventListener('click', ()=> {
            addtoplaylistcontent(data['id']);
        })
        btn_like.classList.add('editactbtn');
        btn_like.setAttribute('id', 'btn_like');
        btn_addtoplaylist.classList.add('editactbtn');
        btn_addtoplaylist.setAttribute('id', 'btn_addtoplaylist');
        editacts.appendChild(btn_like);
        editacts.appendChild(btn_addtoplaylist);
    }
}

async function actioncontentpc(uni_id, type, data_info){
    let editbtn = document.getElementById('editbtn');
    let playlist_info_type = document.getElementById('playlist_info_type');
    if(type == "Track") {
        var data = data_info[0]}
    else if(type=='Playlist') {
        var data = data_info['playlist_info'];
    }
    let editbarcontainer = document.createElement('div');
    let editacts = document.createElement('div');
    editacts.setAttribute('id', 'editactspc');
    editbarcontainer.setAttribute('id', 'editbarcontainpc');
    editbarcontainer.appendChild(editacts);

    if(type == 'Playlist') { 
    if(data['ownership'] == 'mine') {
    let btn_addsongs = document.createElement('div');
    let btn_makeprivate = document.createElement('div');
    let btn_removefromprofile = document.createElement('div');
    let btn_deleteplaylist = document.createElement('div');
    btn_addsongs.classList.add('editactbtnpc');
    btn_addsongs.setAttribute('id', 'btn_addsongs');
    btn_makeprivate.classList.add('editactbtnpc');
    btn_makeprivate.setAttribute('id', 'btn_makeprivate');
    btn_removefromprofile.classList.add('editactbtnpc');
    btn_removefromprofile.setAttribute('id', 'btn_removefromprofile');
    btn_deleteplaylist.classList.add('editactbtnpc');
    btn_deleteplaylist.setAttribute('id', 'btn_deleteplaylist');
    btn_addsongs.innerHTML = "<div><p>Add songs</p></div>"

    if(editbtn.dataset.privacy == 'private') {
    btn_makeprivate.innerHTML = "<div><p>Make public</p></div>"
      }
    else {
        btn_makeprivate.innerHTML = '<div><p>Make private</p></div>'
    }
    btn_makeprivate.addEventListener('click', async ()=>{
        if(editbtn.dataset.privacy == 'private') {
            editbtn.dataset.privacy = 'public'
            playlist_info_type.innerText = "PUBLIC PLAYLIST"
        await fetch(`http://10.48.135.243:5000/playlist/${data['id']}/make/public`);}
        else {
            editbtn.dataset.privacy = 'private'
            playlist_info_type.innerText = "PRIVATE PLAYLIST"
           await fetch(`http://10.48.135.243:5000/playlist/${data['id']}/make/private`)
        }
    })
    btn_removefromprofile.innerHTML = "<div><p>Remove from profile</p></div>"
    btn_deleteplaylist.innerHTML = "<div><p>Delete Playlist</p></div>"
    editacts.appendChild(btn_addsongs);
    editacts.appendChild(btn_makeprivate);
    editacts.appendChild(btn_removefromprofile);
    editacts.appendChild(btn_deleteplaylist);
    btn_deleteplaylist.addEventListener('click', ()=> {
        delete_playlist(data['id']);
        window.history.replaceState({}, '', `http://10.48.135.243:5000/collection/playlists`);
        clear_view_content();
        other_block_content();
        playlist_list.querySelector(`[data-id="${data['id']}"]`).remove();
    });
    } else {
        if (data['inLibrary'] == 'no') {
        let btn_addtolibrary = document.createElement('div');
        btn_addtolibrary.classList.add('editactbtnpc');
        btn_addtolibrary.setAttribute('id', 'btn_addtolibrary');
        btn_addtolibrary.innerHTML = "<div><p>Add to library</p></div>"
        editacts.appendChild(btn_addtolibrary);
        btn_addtolibrary.addEventListener('click', async ()=>{
            let addtolibrary = await fetch(`http://10.48.135.243:5000/library/add/playlist/${data['id']}`)
            addtoplaylist_list(data)
        }) }
        else if(data['inLibrary'] == 'yes') {
            let btn_removefromlibrary = document.createElement('div');
            btn_removefromlibrary.classList.add('editactbtnpc');
            btn_removefromlibrary.setAttribute('id', 'btn_removefromlibrary');
            btn_removefromlibrary.innerHTML = "<div><p>Remove from My Library</p></div>"
            editacts.appendChild(btn_removefromlibrary);
            btn_removefromlibrary.addEventListener('click', async ()=>{
                let removefromlibrary = await fetch(`http://10.48.135.243:5000/library/remove/playlist/${data['id']}`)
                playlist_list.querySelector(`[data-id=${data['id']}]`).remove();
            }) 
        }
    }
    } else if(type == 'Track') {
        let btn_like = document.createElement('div');
        let btn_addtoplaylist = document.createElement('div');
        btn_like.innerHTML = "<div><p>Like</p></div>"
        btn_addtoplaylist.innerHTML = "<div><p>Add to playlist</p></div>"
        btn_like.classList.add('editactbtnpc');
        btn_like.setAttribute('id', 'btn_like');
        btn_addtoplaylist.classList.add('editactbtnpc');
        btn_addtoplaylist.setAttribute('id', 'btn_addtoplaylist');
        editacts.appendChild(btn_like);
        editacts.appendChild(btn_addtoplaylist);
        btn_addtoplaylist.addEventListener('mouseover', ()=>{
           addtoplaylistpc(data['id']);
        })
    }
    if(editbtn.childElementCount == 1) {
        editbtn.appendChild(editbarcontainer);
    } else {
        document.getElementById('editbarcontainpc').remove();
    }
}


async function addtoplaylistpc(track_id){
    if(btn_addtoplaylist.childElementCount == 1)
    {let editbtn = document.getElementById('editbtn');
    let btn_addtoplaylist = editbtn.querySelector('#btn_addtoplaylist');
    let data = await (await fetch('http://10.48.135.243:5000/get/playlists/info')).json();

    let addcontent = document.createElement('div');

    let playlistslist = document.createElement('div');
    addcontent.classList.add('addcontentpc');
    playlistslist.classList.add('playlistslistpc');

    addcontent.appendChild(playlistslist);

    for(let i = 0; i <  data.length; i++) {
        if(data[i]['username'] == data[i]['creator']) {
        let playlist_block = document.createElement('div');
        playlist_block.classList.add('editactbtnpc');
        playlist_block.innerHTML = `<div><p>${data[i]['name']}</p></div>`;
        playlistslist.appendChild(playlist_block);
        playlist_block.addEventListener('click', async ()=>{
            let addto = await fetch(`http://10.48.135.243:5000/add/track/${track_id}/playlist/${data[i]['id']}`)
        })
    }
    }
    btn_addtoplaylist.appendChild(addcontent);}
}







actionbtn.addEventListener('click', ()=>{
    playeractioncontent();
})


async function playeractioncontent() {
    editbar.innerHTML = '';
    editbar.classList.add('edit-bar-show');
    let editbarcontainer = document.createElement('div');
    let edit_container = document.createElement('div');
    let edit_img = document.createElement('div');
    let edit_img_div = document.createElement('div');
    let edit_img_div_img = document.createElement('img');
    let editacts = document.createElement('div');
    let closebtn = document.createElement('div');
    let closebtnwd = document.createElement('p');
    let name_div = document.createElement('div');
    let name_p = document.createElement('p');
    closebtn.setAttribute('id', 'closebtn');
    editacts.setAttribute('id', 'editacts');
    editbarcontainer.setAttribute('id', 'editbarcontainer');
    edit_img.setAttribute('id', 'edit_img');
    edit_container.setAttribute('id', 'edit_container');
    closebtnwd.setAttribute('id', 'closebtnwd');
    name_div.appendChild(name_p);
    name_p.innerText = music_list[0]['name']
    closebtnwd.innerText = 'Close'
    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        })
    closebtn.appendChild(closebtnwd);
    editbar.appendChild(editbarcontainer);
    editbarcontainer.appendChild(edit_container);
    editbar.appendChild(closebtn);

    editbarcontainer.appendChild(editacts);
    edit_container.appendChild(edit_img);
    edit_container.appendChild(name_div);
    edit_img.appendChild(edit_img_div);
    edit_img_div.appendChild(edit_img_div_img);
    edit_img_div_img.setAttribute('src', music_list[0]['thumnail']);
    let btn_like = document.createElement('div');
    let btn_addtoplaylist = document.createElement('div');
    btn_like.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/heart.svg' alt=''></div><div><p>Like</p></div>"
    btn_addtoplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/add-music.svg' alt=''></div><div><p>Add to playlist</p></div>"
    btn_addtoplaylist.addEventListener('click', ()=> {
        addtoplaylistcontent(music_list[0]['id']);
    })
    btn_like.classList.add('editactbtn');
    btn_like.setAttribute('id', 'btn_like');
    btn_addtoplaylist.classList.add('editactbtn');
    btn_addtoplaylist.setAttribute('id', 'btn_addtoplaylist');
    editacts.appendChild(btn_like);
    editacts.appendChild(btn_addtoplaylist);
}


async function musicblockactioncontent(data, playlist_id) {
    let musics_list = view_container_content.querySelector('#musics_list')
    editbar.innerHTML = '';
    editbar.classList.add('edit-bar-show');
    let editbarcontainer = document.createElement('div');
    let edit_container = document.createElement('div');
    let edit_img = document.createElement('div');
    let edit_img_div = document.createElement('div');
    let edit_img_div_img = document.createElement('img');
    let editacts = document.createElement('div');
    let closebtn = document.createElement('div');
    let closebtnwd = document.createElement('p');
    let name_div = document.createElement('div');
    let name_p = document.createElement('p');
    closebtn.setAttribute('id', 'closebtn');
    editacts.setAttribute('id', 'editacts');
    editbarcontainer.setAttribute('id', 'editbarcontainer');
    edit_img.setAttribute('id', 'edit_img');
    edit_container.setAttribute('id', 'edit_container');
    closebtnwd.setAttribute('id', 'closebtnwd');
    name_div.appendChild(name_p);
    name_p.innerText = data['name']
    closebtnwd.innerText = 'Close'
    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        })
    closebtn.appendChild(closebtnwd);
    editbar.appendChild(editbarcontainer);
    editbarcontainer.appendChild(edit_container);
    editbar.appendChild(closebtn);

    editbarcontainer.appendChild(editacts);
    edit_container.appendChild(edit_img);
    edit_container.appendChild(name_div);
    edit_img.appendChild(edit_img_div);
    edit_img_div.appendChild(edit_img_div_img);
    edit_img_div_img.setAttribute('src', data['thumnail']);
    let btn_like = document.createElement('div');
    let btn_addtoplaylist = document.createElement('div');
    let btn_removefromplaylist = document.createElement('div');
    btn_like.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/heart.svg' alt=''></div><div><p>Like</p></div>"
    btn_addtoplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/add-music.svg' alt=''></div><div><p>Add to playlist</p></div>"
    btn_removefromplaylist.innerHTML = "<div class='editbtn_icon'><img src='/static/base/icons/minus.svg' alt=''></div><div><p>Remove from this playlist</p></div>"
    btn_addtoplaylist.addEventListener('click', ()=> {
        addtoplaylistcontent(data['id']);
    })
    btn_removefromplaylist.addEventListener('click', ()=>{
        removefromplaylist(data['id'], playlist_id);
        musics_list.querySelector(`[data-id=${data['id']}]`).remove();
        editbar.classList.remove('edit-bar-show');
        editbar.classList.remove('edit-bar-hidden');
    })


    btn_like.classList.add('editactbtn');
    btn_like.setAttribute('id', 'btn_like');
    btn_addtoplaylist.classList.add('editactbtn');
    btn_addtoplaylist.setAttribute('id', 'btn_addtoplaylist');
    btn_removefromplaylist.classList.add('editactbtn');
    btn_removefromplaylist.setAttribute('id', 'btn_removefromplaylist');
    editacts.appendChild(btn_like);
    editacts.appendChild(btn_addtoplaylist);
    editacts.appendChild(btn_removefromplaylist);

}
























async function open_edit_details(data) {
    let ReactModalPortal = document.createElement('div');
    ReactModalPortal.classList.add('ReactModalPortal');
    let outform = document.createElement('div');
    outform.classList.add('outform');
    main.appendChild(ReactModalPortal);
    let form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('enctype', 'multipart/form-data');
    form.setAttribute('id', 'editform');
    let submit_area = document.createElement('div');
    submit_area.classList.add('submit-area');
    submit_area.innerHTML = '<div class="save-btn"><p>Save</p></div>';
    let playlist_edit_pop_up = document.createElement('div');
    playlist_edit_pop_up.classList.add('playlist-edit-pop-up');
    let pop_up_up = document.createElement('div');
    pop_up_up.classList.add('pop-up-up'); 
    pop_up_up.innerHTML = "<div class='action-name'><h1>Edit details</h1></div><div class='cancel-btn'><img src='/static/base/icons/cancel.svg' alt=''></div>"
    let pop_up_middle = document.createElement('div');
    pop_up_middle.classList.add('pop-up-middle'); 
    let img_container_pop = document.createElement('div');
    img_container_pop.classList.add('img-container-pop');
    img_container_pop.innerHTML = `<img src="${data['thumnail']}" alt="" id="img_place"><input type="file" class="file-input" name="thumnail" accept="image/.jpg, image/.jpeg, image/.png" id="image_upload">`
    let playlist_edit_inputs = document.createElement('div');
    playlist_edit_inputs.classList.add('playlist-edit-inputs');
    playlist_edit_inputs.innerHTML = `<div class="playlist-edit-name-input"><input type="text" placeholder="Name here" autocomplete="none" name="name" id="input_name"></div><div class="playlist-edit-description-input"><textarea name="descriptiontoplaylist" id="" cols="30" rows="10" placeholder="Add an optional description.." name="description">${data['description']}</textarea><input type="text" name="description" id="input_description"></div>`


    pop_up_middle.appendChild(img_container_pop);
    pop_up_middle.appendChild(playlist_edit_inputs);
    ReactModalPortal.appendChild(form);
    ReactModalPortal.appendChild(outform);
    form.appendChild(playlist_edit_pop_up);
    playlist_edit_pop_up.appendChild(pop_up_up);
    playlist_edit_pop_up.appendChild(pop_up_middle);
    playlist_edit_pop_up.appendChild(submit_area);

    let image_preview = document.getElementById('img_place');
    let cancel_btn = document.querySelector('.cancel-btn');
    let image_upload = document.getElementById('image_upload');
    let savebtn = document.querySelector('.save-btn');
    img_container_pop.addEventListener('click', ()=> {
        image_upload.click();
        image_upload.addEventListener('change', function (event){
            if(event.target.files.length > 0){
              var src = URL.createObjectURL(event.target.files[0]);
              image_preview.setAttribute('src', src)
            }
          })
    })
    let input_name = document.getElementById('input_name');
    input_name.value = data['name'];
    outform.addEventListener('click', function(){
        ReactModalPortal.remove();
    })
    cancel_btn.addEventListener('click', ()=> {
        ReactModalPortal.remove();
    })
    savebtn.addEventListener('click', ()=> {
        form.submit();
        clear_view_content();
        collection_content(location.substring(location.lastIndexOf('/') +1), 'Track');
        return false;
})

}


function clear_view_content(){
    view_container_content.innerHTML = '';
}






async function collection_content(uni_id, type) {
    try {
        forsearchbar(); }
        catch {
            
        }
    if (type == "Playlist") {
        var data = await (await fetch(`/get/playlist/${uni_id}/info`)).json();
    }
    else if (type == "Track") {
        var data = await (await fetch(`/get/music/${uni_id}/info`)).json();
        var author_block = document.createElement('div');
        var author_img = document.createElement('div');
        var auhtor_info = document.createElement('div');
        var auhtor_info_in = document.createElement('div');
        var author_name = document.createElement('p');
        var author_info_type = document.createElement('p');
        author_block.setAttribute('id', 'author_block');
        author_img.setAttribute('id', 'author_img');
        auhtor_info.setAttribute('id', 'auhtor_info');
        author_name.setAttribute('id', 'author_name');
        author_info_type.setAttribute('id', 'author_info_type');
        author_img.innerHTML = `<img src="${data[0]['authorava']}" alt=""></img>`


        author_info_type.innerText = "ARTIST";
        author_name.innerText = data[0]['artist']
    }

    let playlist_info = document.createElement('div');
    let info_container = document.createElement('div');
    let playlist_img = document.createElement('div');
    let playlist_info_block = document.createElement('div');
    let playlist_img_img = document.createElement('img');
    let playlist_info_type = document.createElement('p'); 
    let playlist_info_authors = document.createElement('p'); 
    let playlist_author_length = document.createElement('p'); 
    let playlist_info_name = document.createElement('h1');
    let editbtn_img = document.createElement('img');
    let likedbtn_img = document.createElement('img');
    let act_area = document.createElement('div');
    let btn_list = document.createElement('div');
    let playbtn = document.createElement('div');
    let likedbtn = document.createElement('div');
    let editbtn = document.createElement('div');
    let musics_list = document.createElement('div');


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        editbtn.addEventListener('click', function() {
            editbar.classList.add('edit-bar-show');
            editbar.innerHTML = '';
            
            if(type == 'Track') {
                actioncontent(uni_id, 'Track', data)
                
            } else if(type=="Playlist") {
                actioncontent(uni_id, 'Playlist', data)
            }  
        })

    } else {
        editbtn.addEventListener('click', function() {
            if(type == 'Track') {
                actioncontentpc(uni_id, 'Track', data)
            } else if(type=="Playlist") {
                actioncontentpc(uni_id, 'Playlist', data)
            }
        })
    }

    
    
    closebtnwd.addEventListener('click', function(){
        editbar.classList.remove('edit-bar-show');
        editbar.classList.add('edit-bar-hidden');
        editbar.innerHTML = '';
    })

    if (type == "Playlist") {
    playlist_info_name.innerText = data["playlist_info"]['name'];
    playlist_info_authors.innerText = data["playlist_info"]['name'];
    playlist_author_length.innerText = `${data['playlist_info']['creator']}*${data['music_count']} songs`
    if(data['playlist_info']['public'] == false) {
        playlist_info_type.innerText = `PRIVATE PLAYLIST`;
        editbtn.dataset.privacy = 'private'
    } else if(data['playlist_info']['public'] == true) {
        playlist_info_type.innerText = `PUBLIC PLAYLIST`;
        editbtn.dataset.privacy = 'public'
    }
    } else if(type == "Track"){
    playlist_info_type.innerText = 'SONG';
    playlist_info_name.innerText = data[0]['name'];
    playlist_info_authors.innerText = 'Roderick Porter, Tame Impala, Yxngrx1 and more';
    }

    playbtn.classList.add('act_btn_playlist');
    likedbtn.classList.add('act_btn_playlist');
    editbtn.classList.add('act_btn_playlist');

    playlist_author_length.setAttribute('id', 'playlist_author_length');
    playlist_info_type.setAttribute('id', 'playlist_info_type');
    playlist_info_name.setAttribute('id', 'playlist_info_name');
    
    playlist_info_authors.setAttribute('id', 'playlist_info_authors')
    act_area.setAttribute('id', 'act_area');
    btn_list.setAttribute('id', 'btn_list');
    playbtn.setAttribute('id', 'playbtn');
    likedbtn.setAttribute('id', 'likedbtn');
    editbtn.setAttribute('id', 'editbtn');
    playlist_info.setAttribute('id', 'playlist_info');
    musics_list.setAttribute('id', 'musics_list');
    editbtn_img.setAttribute('src', '/static/base/icons/dots.svg');
    likedbtn_img.setAttribute('src', '/static/base/icons/heart.svg');

    if (type == 'Track') {
    playlist_img_img.setAttribute('src', data[0]['thumnail']);
    if (data[0]['liked'] == 'yes') {
        likedbtn.dataset.liked = 'true';
        likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
        }
    else if(data[0]['liked'] == 'no') {
        likedbtn.dataset.liked = 'false';
        likedbtn.style.filter ='invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
    }
    likedbtn.addEventListener('click', async()=>{
        if (likedbtn.dataset.liked == 'true') {
            likedbtn.dataset.liked = 'false';
            likedbtn.style.filter = 'invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
            await fetch(`http://10.48.135.243:5000/likedsongs/remove/track/${data[0]['id']}`);
        } else if(likedbtn.dataset.liked == 'false') {
            likedbtn.dataset.liked = 'true';
            await fetch(`http://10.48.135.243:5000/likedsongs/add/track/${data[0]['id']}`);
            likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)'
        }
    })

    } else if(type == "Playlist") {
        if(data['playlist_info']['ownership'] != 'mine') {
            btn_list.appendChild(likedbtn);
        }
    playlist_img_img.setAttribute('src', data["playlist_info"]['thumnail'])
    if (data['playlist_info']['inLibrary'] == 'yes') {
        likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
        likedbtn.dataset.liked = 'true';
        }
    else if(data['playlist_info']['inLibrary'] == 'no') {
        likedbtn.style.filter ='invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
        likedbtn.dataset.liked = 'false';

    }
    likedbtn.addEventListener('click', async()=>{
        if (likedbtn.dataset.liked== 'true') {
            likedbtn.dataset.liked='false';
            likedbtn.style.filter = 'invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
            await fetch(`http://10.48.135.243:5000/library/remove/playlist/${data['playlist_info']['id']}`);
            playlist_list.querySelector(`[data-id=${data['playlist_info']['id']}]`).remove()
        } else if(likedbtn.dataset.liked== 'false') {
            await fetch(`http://10.48.135.243:5000/library/add/playlist/${data['playlist_info']['id']}`);
            likedbtn.dataset.liked='true';
            addtoplaylist_list(data['playlist_info']);
            likedbtn.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
        }
    })
    }


    playlist_info.setAttribute('id', 'playlist_info');
    info_container.setAttribute('id', 'info_container');
    playlist_img.setAttribute('id', 'playlist_img');
    playlist_info_block.setAttribute('id', 'playlist_info_block');

    btn_list.appendChild(playbtn);
    btn_list.appendChild(likedbtn);


    btn_list.appendChild(editbtn);
    act_area.appendChild(btn_list);
    playlist_img.appendChild(playlist_img_img);
    playlist_info_block.appendChild(playlist_info_type);
    playlist_info_block.appendChild(playlist_info_name);
    editbtn.appendChild(editbtn_img);
    likedbtn.appendChild(likedbtn_img);
    


    playlist_info_block.appendChild(playlist_author_length);
    playlist_info_block.appendChild(playlist_info_authors);


    info_container.appendChild(playlist_img);
    info_container.appendChild(playlist_info_block);
    playlist_info.appendChild(info_container);

    view_container_content.appendChild(playlist_info);
    view_container_content.appendChild(act_area);


    if (type == 'Playlist') {
    info_container.addEventListener('click', ()=> {
    if(window.innerWidth > 700){open_edit_details(data['playlist_info']);};
    });
    view_container_content.appendChild(musics_list);
    playbtn.innerHTML = '<i class="fa fa-play-circle fa-5x collection_btn"></i>'
    playbtn.dataset.id = data['playlist_info']['id'];
    playbtn.addEventListener('click', function(){
            music_list = data['musics'];
            loadTrack(track_index);
            playTrack();
    })

    for(let i=0; i <= data['musics'].length; i++) {
        let actionbtn = document.createElement('div');
        let music_block = document.createElement('div');
        let musindex = document.createElement('div');
        let playmusbtn = document.createElement('div');
        let playmusbtn_img = document.createElement('img');
        let thumnail = document.createElement('div');
        let thumnail_img = document.createElement('img');
        let music_info = document.createElement('div');
        let music_name = document.createElement('p');
        let music_author = document.createElement('p');
        let musindexnum = document.createElement('p');
        actionbtn.innerHTML = '<img src="/static/base/icons/dots.svg" alt="">'
        playmusbtn_img.setAttribute('src', '/static/base/icons/play-trian.svg');
        thumnail_img.setAttribute('src', data['musics'][i]["thumnail"]);
        music_block.dataset.id = data['musics'][i]['id']
        music_name.innerText = data['musics'][i]['name'];
        music_author.innerText = data['musics'][i]['artist'];
        musindexnum.innerText = i +1 ;
        actionbtn.classList.add('actionbtncollection');
        playmusbtn.dataset.id = data['musics'][i]['id'];
        playmusbtn.classList.add('playmusbtn');
        music_name.classList.add('music_name');
        music_author.classList.add('music_author');
        playmusbtn.classList.add('playmusbtn');
        musindexnum.classList.add('musindexnum');
        music_block.classList.add('music_block');
        musindex.classList.add('musindex');
        thumnail.classList.add('thumnail');
        music_info.classList.add('music_info');
        music_info.appendChild(music_name);
        music_info.appendChild(music_author);
        thumnail.appendChild(thumnail_img);
        playmusbtn.appendChild(playmusbtn_img);
        musindex.appendChild(musindexnum);
        musindex.appendChild(playmusbtn);
        music_block.appendChild(musindex);
        music_block.appendChild(thumnail);
        music_block.appendChild(music_info);
        music_block.appendChild(actionbtn);
        musics_list.appendChild(music_block);
        music_name.dataset.id = data['musics'][i]['id']
        music_name.addEventListener('click', async function (){
            window.history.pushState({}, '', `http://10.48.135.243:5000/track/${data['musics'][i]['id']}`);
            clear_view_content();
            collection_content(`${data['musics'][i]['id']}`, "Track");
        })
        playmusbtn.addEventListener('click', async function() {
            let music = await fetch(`/get/music/${data['musics'][i]['id']}/info`);
            let datam = await music.json();
            music_list = await datam;

            loadTrack(track_index);
            playTrack();
        });
        actionbtn.addEventListener('click',  ()=>{
            musicblockactioncontent(data['musics'][i], uni_id);
        });
        };
    } else if (type == 'Track') {
        view_container_content.appendChild(author_block);
        author_block.appendChild(author_img);
        author_block.appendChild(auhtor_info);
        auhtor_info.appendChild(auhtor_info_in);
        auhtor_info_in.appendChild(author_info_type);
        auhtor_info_in.appendChild(author_name);
        playbtn.innerHTML = '<i class="fa fa-play-circle fa-5x collection_btn"></i>'
        playbtn.dataset.id = data[0]['id'];
        playbtn.addEventListener('click', async function(){
            let music = await fetch(`/get/music/${data[0]['id']}/info`);
            let datam = await music.json();
            music_list = await datam;
            loadTrack(track_index);
            playTrack();
    });
    }
};







async function collection_likedsongs() {
    var data = await (await fetch(`http://10.48.135.243:5000/likedsongs/get/info`)).json();
    let playlist_info = document.createElement('div');
    let info_container = document.createElement('div');
    let playlist_img = document.createElement('div');
    let playlist_info_block = document.createElement('div');
    let playlist_img_img = document.createElement('img');
    let playlist_info_type = document.createElement('p'); 
    let playlist_info_authors = document.createElement('p'); 
    let playlist_author_length = document.createElement('p'); 
    let playlist_info_name = document.createElement('h1');
    let editbtn_img = document.createElement('img');
    let likedbtn_img = document.createElement('img');
    let act_area = document.createElement('div');
    let btn_list = document.createElement('div');
    let playbtn = document.createElement('div');
    let musics_list = document.createElement('div');
    playlist_info_type.innerText = 'PLAYLIST';
    playlist_info_name.innerText = "Liked Songs";
    playlist_author_length.innerText = `${data['playlist_info']['creator']}*${data['music_count']} songs`

    playbtn.classList.add('act_btn_playlist');

    playlist_author_length.setAttribute('id', 'playlist_author_length');
    playlist_info_type.setAttribute('id', 'playlist_info_type');
    playlist_info_name.setAttribute('id', 'playlist_info_name');
    
    playlist_info_authors.setAttribute('id', 'playlist_info_authors')
    act_area.setAttribute('id', 'act_area');
    btn_list.setAttribute('id', 'btn_list');
    playbtn.setAttribute('id', 'playbtn');
    playlist_info.setAttribute('id', 'playlist_info');
    musics_list.setAttribute('id', 'musics_list');
    editbtn_img.setAttribute('src', '/static/base/icons/dots.svg');

    playlist_img_img.setAttribute('src', "/static/base/icons/liked.png")    

    playlist_info.setAttribute('id', 'playlist_info');
    info_container.setAttribute('id', 'info_container');
    playlist_img.setAttribute('id', 'playlist_img');
    playlist_info_block.setAttribute('id', 'playlist_info_block');

    btn_list.appendChild(playbtn);
    act_area.appendChild(btn_list);
    playlist_img.appendChild(playlist_img_img);
    playlist_info_block.appendChild(playlist_info_type);
    playlist_info_block.appendChild(playlist_info_name);
    


    playlist_info_block.appendChild(playlist_author_length);
    playlist_info_block.appendChild(playlist_info_authors);


    info_container.appendChild(playlist_img);
    info_container.appendChild(playlist_info_block);
    playlist_info.appendChild(info_container);

    view_container_content.appendChild(playlist_info);
    view_container_content.appendChild(act_area);


    view_container_content.appendChild(musics_list);
    playbtn.innerHTML = '<i class="fa fa-play-circle fa-5x collection_btn"></i>'
    playbtn.dataset.id = data['playlist_info']['id'];
    playbtn.addEventListener('click', function(){
            music_list = data['musics'];
            loadTrack(track_index);
            playTrack();
    })

    for(let i=0; i <= data['musics'].length ; i++) {
        let music_block = document.createElement('div');
        let musindex = document.createElement('div');
        let playmusbtn = document.createElement('div');
        let playmusbtn_img = document.createElement('img');
        let thumnail = document.createElement('div');
        let thumnail_img = document.createElement('img');
        let music_info = document.createElement('div');
        let music_name = document.createElement('p');
        let music_author = document.createElement('p');
        let musindexnum = document.createElement('p');
        playmusbtn_img.setAttribute('src', '/static/base/icons/play-trian.svg');
        thumnail_img.setAttribute('src', data['musics'][i]["thumnail"]);
        music_name.innerText = data['musics'][i]['name'];
        music_author.innerText = data['musics'][i]['artist'];
        musindexnum.innerText = i +1;
        playmusbtn.classList.add('playmusbtn');
        music_name.classList.add('music_name');
        music_author.classList.add('music_author');
        playmusbtn.classList.add('playmusbtn');
        musindexnum.classList.add('musindexnum');
        music_block.classList.add('music_block');
        musindex.classList.add('musindex');
        thumnail.classList.add('thumnail');
        music_info.classList.add('music_info');
        music_info.appendChild(music_name);
        music_info.appendChild(music_author);
        thumnail.appendChild(thumnail_img);
        playmusbtn.appendChild(playmusbtn_img);
        musindex.appendChild(musindexnum);
        musindex.appendChild(playmusbtn);
        music_block.appendChild(musindex);
        music_block.appendChild(thumnail);
        music_block.appendChild(music_info);
        musics_list.appendChild(music_block);
        music_name.dataset.id = data['musics'][i]['id']
        music_name.addEventListener('click', async function (){
            window.history.pushState({}, '', `http://10.48.135.243:5000/track/${data['musics'][i]['id']}`);
            clear_view_content();
            collection_content(`${data['musics'][i]['id']}`, "Track");
        })
        playmusbtn.addEventListener('click', async function() {
            let music = await fetch(`/get/music/${data['musics'][i]['id']}/info`);
            let datam = await music.json();
            music_list = await datam;

            loadTrack(track_index);
            playTrack();
        });
        };
    
};


















async function home_content() {
    try {
        forsearchbar(); }
        catch {}
    let response = await fetch(`get/home/content`);
    playlists = await response.json();
    let container_block = document.createElement('div');
    container_block.classList.add('container_block');
    container_block.classList.add('container_block_1')
    let block_name = document.createElement('div');
    block_name.classList.add('block_name')
    block_name.innerHTML = "<h1>Good Afternoon</h1>"
    let section_block = document.createElement('div');
    let playlist_block = document.createElement('div');
    playlist_block.classList.add('played_playlist_block');
    playlist_block.classList.add('name_playlist_block');
    section_block.setAttribute('id', 'recently_played_playlists');
    section_block.classList.add('section_block');
    view_container_content.appendChild(container_block);
    container_block.appendChild(block_name);
    container_block.appendChild(section_block);
    for(i=0; i <6 ;i++){
        let playbtn_block = document.createElement('div');
        playbtn_block.classList.add('playbtn_block');
        playbtn_block.dataset.id = playlists[i]['id'];
        playbtn_block.innerHTML= '<i class="fa fa-play-circle fa-5x collection_btn"></i>'
        let playlist_block = document.createElement('div');
        playlist_block.dataset.id = playlists[i]['id'];
        playlist_block.classList.add('played_playlist_block');
        playlist_block.classList.add('name_playlist_block');
        let img = document.createElement('div');
        let img_img = document.createElement('img');
        img_img.setAttribute('src', playlists[i]['thumnail']);
        img_img.classList.add('img_container_block');
        let playlist_name = document.createElement('div');
        let p = document.createElement('p');
        p.innerText = playlists[i]['name'];
        playlist_name.classList.add('playlist_name');
        playlist_name.appendChild(p);
        img.classList.add('img_container_block');
        img.appendChild(img_img);
        playlist_block.appendChild(img);
        playlist_block.appendChild(playlist_name);
        playlist_block.appendChild(playbtn_block);
        section_block.appendChild(playlist_block);
        playlist_block.addEventListener('click', async function(){
            window.history.pushState({}, '', `http://10.48.135.243:5000/playlist/${this.dataset.id}`);
            clear_view_content();
            collection_content(this.dataset.id, 'Playlist');
        })
        playbtn_block.addEventListener('click', async function(){
            let data = await (await fetch(`/get/playlist/${this.dataset.id}/info`)).json();
            music_list = await data['musics'];
            loadTrack(track_index);
            playTrack();
    });
    }
    // let last_child = view_container_content.lastElementChild ;
    // last_child.classList.add('container_block_last');
}

async function createplaylist2(){
    let ReactModalPortal = document.createElement('div');
    ReactModalPortal.classList.add('ReactModalPortal');
    ReactModalPortal.style.top = '300%';
    main.appendChild(ReactModalPortal);
    sleep(100).then(()=>{
        ReactModalPortal.style.top = '0';
    })
    let creplaylistcontent = document.createElement('div');
    creplaylistcontent.classList.add('creplaylistcontent');
    let crecontainer = document.createElement('div');
    crecontainer.classList.add('crecontainer');
    let crename = document.createElement('div');
    crename.classList.add('crename');
    crename.innerHTML = '<p>Give your playlist a name</p>'
    let input_container = document.createElement('div');
    input_container.classList.add('input-container');
    input_container.innerHTML = '<input type="text" name="PlaylistName" id="playlistnameinput">'
    let btn_area = document.createElement('div');
    btn_area.classList.add('btn-area');
    btn_area.innerHTML = '<div class="cre-btn"><p>Create</p></div>'
    let cancel_btn = document.createElement('div');
    cancel_btn.classList.add('crecancelbtn');
    cancel_btn.innerHTML = '<img src="/static/base/icons/cancel.svg" alt="">'

    ReactModalPortal.appendChild(creplaylistcontent);
    creplaylistcontent.appendChild(crecontainer);
    creplaylistcontent.appendChild(cancel_btn);
    crecontainer.appendChild(crename);
    crecontainer.appendChild(input_container);
    crecontainer.appendChild(btn_area);
    let cre_btn_play = document.querySelector('.cre-play-tbn')
    let cre_btn = document.querySelector('.cre-btn');
    let name = document.getElementById('playlistnameinput')

    name.focus();
    cre_btn.addEventListener('click', async ()=>{
        let createplaylist = await fetch(`http://10.48.135.243:5000/create2/playlist/${name.value}`);
        clear_view_content();
        other_block_content();
        ReactModalPortal.style.top = '300%';
        sleep(1000).then(()=>{
            ReactModalPortal.remove();
        })
    })
    sleep(1000).then(() => {
        cancel_btn.addEventListener('click', async ()=> {
            ReactModalPortal.style.top = '300%';
            sleep(1000).then(() => {
                ReactModalPortal.remove();
              });
        })
      });
}

async function other_block_content(){
    try {
        forsearchbar(); }
        catch {}
    let playlists = await fetch(`/get/playlists/info`);
    let data = await playlists.json();
    let container_block = document.createElement('div');
    let block_name = document.createElement('div');
    let section_block = document.createElement('div');
    let cre_play_tbn = document.createElement('div');
    cre_play_tbn.classList.add('cre-play-tbn');
    cre_play_tbn.innerHTML = '<img src="/static/base/icons/plus.svg" alt="">'
    container_block.classList.add('container_block');
    container_block.classList.add('container_block_collection');
    block_name.classList.add('block_name');
    section_block.classList.add('section_block');
    section_block.classList.add('section_block_library');
    block_name.innerHTML = '<p>Playlists</p>'
    container_block.appendChild(block_name);
    container_block.appendChild(section_block);
    cre_play_tbn.addEventListener('click', ()=>{
    });
    cre_play_tbn.addEventListener('click', ()=>{
                createplaylist2();
      });


    
    let block_info = document.createElement('div');
    let name_playlist_block = document.createElement('div');
    let img_container_block_other = document.createElement('div');
    let img_container_block_other_img = document.createElement('img');
    let other_block_btn = document.createElement('div')
    let bla_bla = document.createElement('div');
    let bla_bla_p = document.createElement('p');
    other_block_btn.innerHTML = '<i class="fa fa-play-circle fa-5x playbtn_block_icon"></i>';
    bla_bla_p.innerText = "Liked Songs";
    img_container_block_other_img.setAttribute('src', '/static/base/icons/liked.png');
    block_info.classList.add('block_info');
    name_playlist_block.classList.add('name_playlist_block');
    img_container_block_other.classList.add('img_container_block_other');
    img_container_block_other_img.classList.add('img_container_block_other');
    other_block_btn.classList.add('other_block_btn');
    bla_bla.classList.add('bla_bla');
    bla_bla.appendChild(bla_bla_p);
    section_block.appendChild(name_playlist_block);
    name_playlist_block.appendChild(block_info);
    block_info.appendChild(img_container_block_other);
    block_info.appendChild(bla_bla);
    img_container_block_other.appendChild(img_container_block_other_img);
    img_container_block_other.appendChild(other_block_btn);
    // other_block_btn.addEventListener('click', async function() {
    //     let playlist_data = await fetch(`/get/playlist/${this.dataset.id}/info`);
    //     let data = await playlist_data.json();
    //     music_list = data['musics'];
    //     loadTrack(track_index);
    //     playTrack();
    // });
    name_playlist_block.addEventListener('click', async function(){
            window.history.pushState({}, '', `http://10.48.135.243:5000/collection/tracks`);
            clear_view_content();
            collection_likedsongs()
        });











    for(var i = 0; i < data.length; i++) {
    let block_info = document.createElement('div');
    let name_playlist_block = document.createElement('div');
    let img_container_block_other = document.createElement('div');
    let img_container_block_other_img = document.createElement('img');
    let other_block_btn = document.createElement('div')
    let bla_bla = document.createElement('div');
    let bla_bla_p = document.createElement('p');
    other_block_btn.innerHTML = '<i class="fa fa-play-circle fa-5x playbtn_block_icon"></i>';
    bla_bla_p.innerText = data[i]['name'];
    img_container_block_other_img.setAttribute('src', data[i]['thumnail']);
    other_block_btn.dataset.id = data[i]['id'];
    block_info.classList.add('block_info');
    name_playlist_block.classList.add('name_playlist_block');
    name_playlist_block.dataset.id = data[i]['id'];
    img_container_block_other.classList.add('img_container_block_other');
    img_container_block_other_img.classList.add('img_container_block_other');
    other_block_btn.classList.add('other_block_btn');
    bla_bla.classList.add('bla_bla');
    bla_bla.appendChild(bla_bla_p);
    section_block.appendChild(name_playlist_block);
    name_playlist_block.appendChild(block_info);
    block_info.appendChild(img_container_block_other);
    block_info.appendChild(bla_bla);
    img_container_block_other.appendChild(img_container_block_other_img);
    img_container_block_other.appendChild(other_block_btn);
    other_block_btn.addEventListener('click', async function() {
        let playlist_data = await fetch(`/get/playlist/${this.dataset.id}/info`);
        let data = await playlist_data.json();
        music_list = data['musics'];
        loadTrack(track_index);
        playTrack();
    });
    name_playlist_block.addEventListener('click', async function(){
            window.history.pushState({}, '', `http://10.48.135.243:5000/playlist/${this.dataset.id}`);
            clear_view_content();
            collection_content(this.dataset.id, "Playlist");
        });
}
if(window.innerWidth < 700) {
    block_name.appendChild(cre_play_tbn);
    }
view_container_content.appendChild(container_block);
}










async function other_block_content_home(section){
    let playlists = await fetch(`/get/playlists/info`);
    let data = await playlists.json();


    let container_block = document.createElement('div');
    let block_name = document.createElement('div');
    let section_block = document.createElement('div');
    container_block.classList.add('container_block');
    block_name.classList.add('block_name');
    section_block.classList.add('section_block');
    section_block.classList.add('section_block_other')
    block_name.innerHTML = `<h1>${section}</h1>`
    container_block.appendChild(block_name);
    container_block.appendChild(section_block);
    for(var i = 0; i < 6; i++) {
    let block_info = document.createElement('div');
    let name_playlist_block = document.createElement('div');
    let img_container_block_other = document.createElement('div');
    let img_container_block_other_img = document.createElement('img');
    let other_block_btn = document.createElement('div')
    let bla_bla = document.createElement('div');
    let bla_bla_p = document.createElement('p');
    other_block_btn.innerHTML = '<i class="fa fa-play-circle fa-5x playbtn_block_icon"></i>';
    bla_bla_p.innerText = data[i]['name'];
    img_container_block_other_img.setAttribute('src', data[i]['thumnail']);
    other_block_btn.dataset.id = data[i]['id'];
    block_info.classList.add('block_info');
    name_playlist_block.classList.add('name_playlist_block');
    name_playlist_block.dataset.id = data[i]['id'];
    img_container_block_other.classList.add('img_container_block_other');
    img_container_block_other_img.classList.add('img_container_block_other');
    other_block_btn.classList.add('other_block_btn');
    bla_bla.classList.add('bla_bla');
    bla_bla.appendChild(bla_bla_p);
    section_block.appendChild(name_playlist_block);
    name_playlist_block.appendChild(block_info);
    block_info.appendChild(img_container_block_other);
    block_info.appendChild(bla_bla);
    img_container_block_other.appendChild(img_container_block_other_img);
    img_container_block_other.appendChild(other_block_btn);
    other_block_btn.addEventListener('click', async function() {
        let playlist_data = await fetch(`/get/playlist/${this.dataset.id}/info`);
        let data = await playlist_data.json();
        music_list = data['musics'];
        loadTrack(track_index);
        playTrack();
    });
    name_playlist_block.addEventListener('click', async function(){
            window.history.pushState({}, '', `http://10.48.135.243:5000/playlist/${this.dataset.id}`);
            clear_view_content();
            collection_content(this.dataset.id, "Playlist");
        });
    view_container_content.appendChild(container_block);
}
}

async function get_last_history() {
    let data_last = await (await fetch(`http://10.48.135.243:5000/history/get/last`)).json();
    music_list = await (await fetch(`http://10.48.135.243:5000/get/music/${data_last['last_track']}/info`)).json();
    sleep(0).then(()=>{
        loadTrack(track_index);
    });
};

async function update_history(id) {
    await fetch(`http://10.48.135.243:5000/history/last/track/${id}`)
}

get_last_history();




async function checklikedplayer(id){
    let playerlikedbtnclone = document.querySelector('.playerlikedbtn');
    
    liked = await (await fetch(`http://10.48.135.243:5000/get/music/${id}/info`)).json()
    sleep(100).then(()=>{
        if (liked[0]['liked'] == 'yes') {
            playerlikedbtnclone.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
            playerlikedbtnclone.dataset.liked = 'true';
            }
        else if(liked[0]['liked'] == 'no') {
            playerlikedbtnclone.style.filter ='invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
            playerlikedbtnclone.dataset.liked = 'false';
        }
        playerlikedbtnclone.addEventListener('click', async()=>{
            if (playerlikedbtnclone.dataset.liked == 'true') {
                playerlikedbtnclone.dataset.liked = 'false';
                playerlikedbtnclone.style.filter = 'invert(100%) sepia(100%) saturate(1%) hue-rotate(305deg) brightness(103%) contrast(101%)';
                await fetch(`http://10.48.135.243:5000/likedsongs/remove/track/${id}`);
            } else if(playerlikedbtn.dataset.liked == 'false') {
                await fetch(`http://10.48.135.243:5000/likedsongs/add/track/${id}`);
                playerlikedbtnclone.dataset.liked = 'true';
                playerlikedbtnclone.style.filter = 'invert(73%) sepia(59%) saturate(5011%) hue-rotate(232deg) brightness(101%) contrast(101%)';
            }
        })
    })
}


// ==============================================Player Bar================================

let now_playing = document.querySelector('.now-playing');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');



let playpause_btn = document.querySelectorAll('.playpause-track');
let next_btn = document.querySelectorAll('.next-track');
let prev_btn = document.querySelectorAll('.prev-track');

let seek_slider = document.querySelectorAll('.seek_slider');
let reset_btn = document.querySelectorAll('.repeat-track')
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelectorAll('.current-time');
let total_duration = document.querySelectorAll('.total-duration');
let randomIcon = document.querySelectorAll('.random-track');
let curr_track = document.createElement('audio');
let music_thumnail = document.querySelector('.music_thumnail_img');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;




try {
    playpause_btn_closed.addEventListener('click', ()=>{
        playpauseTrack();
    })
} catch (error) {
}

playpause_btn.forEach(item=>{
    item.addEventListener('click', ()=>{
        playpauseTrack();
    })
})
next_btn.forEach(item=>{
    item.addEventListener('click', ()=>{
        nextTrack();
    })
})
prev_btn.forEach(item=>{
    item.addEventListener('click', ()=>{
        prevTrack();
    })
})
randomIcon.forEach(item=>{
    item.addEventListener('click', ()=>{
        randomTrack();
    })
})
reset_btn.forEach(item=>{
    item.addEventListener('click', ()=>{
        reset();
    })
})

seek_slider.forEach(item => {
    item.addEventListener('change', ()=>{
        seekTo();
    });
})


function loadTrack(track_index){
    actionbtn.dataset.id = music_list[track_index].id;
    var dataforplayerbar = music_list[track_index];
    clearInterval(updateTimer);
    reset();
    curr_track.src = music_list[track_index].music;
    update_history(music_list[track_index].id);
    curr_track.load();
    music_thumnail.style = 'filter: none'
    music_thumnail.setAttribute('src', music_list[track_index].thumnail);
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    checklikedplayer(music_list[track_index].id);
    
}



function reset(){
    curr_time.forEach(item =>{
        item.textContent = "00:00";
    })
    total_duration.forEach(item =>{
        item.textContent = "00:00";
    })
    seek_slider.forEach(item =>{
        item.textContent = "00:00";
    })
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.forEach(item => {
        item.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    })
    try {
        playpause_btn_closed.innerHTML = '<i class="fa fa-pause fa-5x"></i>'
    } catch (error) {
        
    }
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.forEach(item => {
        item.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    })
    try {
        playpause_btn_closed.innerHTML = '<i class="fa fa-play fa-5x"></i>'
    } catch (error) {
        
    }

}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    update_history(music_list[track_index].id);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    update_history(music_list[track_index].id);
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}


function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        seek_slider.forEach(item =>{
            item.value = seekPosition;
        })

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }


        curr_time.forEach(item =>{
            item.textContent = currentMinutes + ":" + currentSeconds;
        })
        total_duration.forEach(item =>{
            item.textContent = durationMinutes + ":" + durationMinutes;
        })
    }
}