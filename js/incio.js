$('#irSpotify').click(() => {
    alert('Hiciste click');
    $(location).attr(
        'href',
        'https://accounts.spotify.com/authorize?client_id=c444f9c5b8ed428380e8c1453a2878cb&response_type=code&redirect_uri=http://127.0.0.1:5500/inicio.html&scope=user-read-private%20user-read-email%20user-follow-read'
    );
});
