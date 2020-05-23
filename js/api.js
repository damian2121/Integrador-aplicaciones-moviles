let searchParams = new URLSearchParams(window.location.search);

if (searchParams.has('code')) {
    var settings = {
        url: URL_SPOTIFY,
        method: 'POST',
        timeout: 0,
        headers: {
            Authorization: `Basic ${CLIENT_ID}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            grant_type: GRANT_TYPE,
            code: searchParams.get('code'),
            redirect_uri: REDIRECT_URI,
        },
    };
    $.ajax(settings)
        .done(function (response) {
            localStorage.setItem('token', response.access_token);
            // mePlayList(response.access_token);url
            window.history.replaceState({}, document.title, '/' + 'inicio.html');
        })
        .fail(function (error) {
            Notificacion.onlyEliminar('error', 'Error', 'No se ha podido cargar sus playlist: ' + error.responseText);
        });
}

if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    const settings = {
        url: 'https://api.spotify.com/v1/me',
        method: 'GET',
        timeout: 0,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    $.ajax(settings)
        .done(function ({ country, display_name, id }) {
            localStorage.setItem('user', JSON.stringify({ pais: country, id, name: display_name }));
        })
        .fail(function (error) {
            Notificacion.onlyEliminar('error', 'Error', 'No se ha podido cargar sus playlist: ' + error.responseText);
        });
}

function crearPlaylist(data) {
    const { id } = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    var settings = {
        url: `https://api.spotify.com/v1/users/${id}/playlists`,
        method: 'POST',
        timeout: 0,
        headers: {
            Accept: 'application/json',
            'Content-Type': ['application/json', 'text/plain'],
            Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
    };

    $.ajax(settings)
        .done(function (response) {
            Notificacion.onlyEliminar('success', 'Exito', 'Se Creo la Playlist');
        })
        .fail(function (error) {
            Notificacion.onlyEliminar('error', 'Error', 'No se ha podido cargar sus playlist: ' + error.responseText);
        });
}
