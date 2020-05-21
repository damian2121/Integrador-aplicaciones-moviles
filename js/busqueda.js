$(function () {
    var token = localStorage.getItem('token');
    $('[name=buscar-filtro]').click(function () {
        var name = $('[name=name-filter]').val(),
            type = $('[name=type-filter]').val(),
            country = $('[name=country-filter]').val(),
            limit = $('[name=limit-filter]').prop('checked');
        filter(token, name, type, country, limit);
    });
});

function filter(token, name, type, country, limit) {
    if (validarBusqueda()) {
        $('article').remove();
        var contentType = '&type=' + type,
            contentLimit = limit ? '&limit=10' : '',
            contentPais = country === '-' ? '' : '&market=' + country;
        $.get({
            url: 'https://api.spotify.com/v1/search?q=' + name + contentType + contentPais + contentLimit,
            headers: { Authorization: 'Bearer ' + token },
        })
            .done(function (response) {
                console.log(response);
                if (type === 'track') {
                    $.each(response.tracks.items, function (i, item) {
                        var urlImage = item.album.images.length === 0 ? null : item.album.images[0].url;
                        agregarItem(
                            item.name,
                            urlImage,
                            'Escuchar',
                            item.external_urls.spotify,
                            item.id,
                            'add',
                            item.uri
                        );
                    });
                } else {
                    var list =
                        type === 'artist' ? response.artists : type === 'album' ? response.albums : response.playlists;
                    $.each(list.items, function (i, item) {
                        var urlImage = item.images.length === 0 ? null : item.images[0].url;

                        agregarItem(
                            item.name,
                            urlImage,
                            'Ingresar',
                            item.external_urls.spotify,
                            item.id,
                            'search',
                            null,
                            item
                        );
                    });
                }
            })
            .fail(function (error) {
                alert('No se ha podido cargar sus playlist: ' + error.responseText);
            });
    }
}
