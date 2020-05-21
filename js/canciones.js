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
    $.get({
        url: 'https://api.spotify.com/v1/playlists/' + localStorage.getItem('myPlaylistId') + '/tracks',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
        .done(function (response) {
            $.each(response.items, function (i, item) {
                $('.prl-articles').append(
                    $('<li/>')
                        .append(
                            $('<button/>')
                                .text(item.track.name)
                                .attr({ target: '_blank', href: item.track.external_urls })
                                .click(() => $('#reproductor').attr('src', item.track.preview_url)[0].play()),
                            $('<i/>')
                                .addClass('fas fa-trash-alt')
                                .click(function () {
                                    borrarCancion(item.track.uri);
                                    $(this).closest('li').hide(500);
                                })
                        )

                        .attr({ title: 'Pista ' + item.track.name + ' en Spotify' })
                );
            });
        })
        .fail(function (error) {
            alert('No se ha podido cargar sus playlist: ' + error.responseText);
        });
}

function tracksAdd() {
    const items = JSON.parse(localStorage.getItem('busqueda'));
    var modal = $('#myModal');

    $.each(items, function (i, item) {
        const auxItem = item.name ? item : item.track;
        $('.prl-articles').append(
            $('<li/>')
                .append(
                    $('<button/>')
                        .text(auxItem.name)
                        .attr({ target: '_blank', href: auxItem.external_urls })
                        .click(() => $('#reproductor').attr('src', auxItem.preview_url)[0].play()),
                    $('<i/>')
                        .addClass('fas fa-plus-square')
                        .click(function () {
                            buildModalAdd(auxItem.name, auxItem.uri);
                            modal.show('slow');
                        })
                )
                .attr({ title: 'Pista ' + auxItem.name + ' en Spotify' })
        );
    });
}

function borrarCancion(uri_Spotify) {
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
        console.log(response);
    });
}
