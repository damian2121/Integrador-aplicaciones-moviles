$(function () {
    // const canciones = JSON.parse(localStorage.getItem('canciones'));

    if (localStorage.getItem('route') === 'playlist') {
        meTrackPlaylist();
    } else {
        tracksAdd();
    }
});

$(window).bind('storage', function () {
    if (localStorage.getItem('route') === 'playlist') {
        meTrackPlaylist();
    } else {
        tracksAdd();
    }
});
function meTrackPlaylist() {
    let imagen = [];
    $.get({
        url: 'https://api.spotify.com/v1/playlists/' + localStorage.getItem('myPlaylistId') + '/tracks',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
        .done(function (response) {
            console.log(response);

            $.each(response.items, function (i, item) {
                let data = {
                    image: item.track.album.images[0].url,
                    name: item.track.album.name,
                };
                imagen.push(data);
                $('.prl-articles').append(
                    $('<li/>')
                        .append(
                            $('<p/>').text(item.track.name).attr({ target: '_blank', href: item.track.external_urls }),
                            $('<div/>')
                                .addClass('contenedor-icono')
                                .append(
                                    $('<i/>')
                                        .addClass('fas fa-play-circle fa')
                                        .click(function () {
                                            const data = JSON.parse(localStorage.getItem('dataCancion'));
                                            const index = parseInt(this.id);
                                            $('#tituloCancion').text(data[index].name);
                                            $('#imagenCancion').attr('src', data[index].image);
                                            $('#reproductor').attr('src', item.track.preview_url)[0].play();
                                        })
                                        .attr('id', i),
                                    $('<i/>')
                                        .addClass('fas fa-trash-alt fa')
                                        .click(function () {
                                            Notificacion.notificar(
                                                'info',
                                                'Cuidado!',
                                                'Esta por borra una cancion',
                                                true,
                                                'Aceptar',
                                                false,
                                                () => {
                                                    borrarCancion(item.track.uri, this);
                                                }
                                            );
                                        })
                                )
                        )

                        .attr({ title: 'Pista ' + item.track.name + ' en Spotify', id: i })
                );
            });
            localStorage.setItem('dataCancion', JSON.stringify(imagen));
        })
        .fail(function (error) {
            Notificacion.onlyEliminar('error', 'Error', 'Ocurrio un error' + error.responseText);
        });
}

function tracksAdd() {
    const items = JSON.parse(localStorage.getItem('busqueda'));
    var modal = $('#myModal');
    let imagen = [];

    $.each(items, function (i, item) {
        const auxItem = item.name ? item : item.track;
        let data = {};
        if (auxItem.album) {
            data = {
                image: auxItem.album.images[0].url,
                name: auxItem.album.name,
            };
        } else {
            data = {
                image: localStorage.getItem('album-image'),
                name: localStorage.getItem('album-name'),
            };
        }

        imagen.push(data);
        $('.prl-articles').append(
            $('<li/>')
                .append(
                    $('<p/>').text(auxItem.name).attr({ target: '_blank', href: auxItem.external_urls }),
                    $('<div/>')
                        .addClass('contenedor-icono')
                        .append(
                            $('<i/>')
                                .addClass('fas fa-play-circle fa')
                                .click(function () {
                                    const data = JSON.parse(localStorage.getItem('dataCancion'));
                                    const index = parseInt(this.id);
                                    console.log(data);
                                    $('#tituloCancion').text(data[index].name);
                                    $('#imagenCancion').attr('src', data[index].image);
                                    $('#reproductor').attr('src', auxItem.preview_url)[0].play();
                                })
                                .attr('id', i),
                            $('<i/>')
                                .addClass('fas fa-plus-square fa')
                                .click(function () {
                                    buildModalAdd(auxItem.name, auxItem.uri);
                                    modal.show('slow');
                                })
                        )
                )
                .attr({ title: 'Pista ' + auxItem.name + ' en Spotify' })
        );
    });
    localStorage.setItem('dataCancion', JSON.stringify(imagen));
}

function borrarCancion(uri_Spotify, obj) {
    var settings = {
        url: `https://api.spotify.com/v1/playlists/${localStorage.getItem('myPlaylistId')}/tracks`,
        method: 'DELETE',
        timeout: 0,
        headers: {
            Accept: 'application/json',
            'Content-Type': ['application/json', 'text/plain'],
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: JSON.stringify({ tracks: [{ uri: uri_Spotify }] }),
    };

    $.ajax(settings).done(function (response) {
        Notificacion.onlyEliminar('success', 'Exito', 'La cancion a sido eliminada');
        $(obj).closest('li').hide(500);
    });
}
