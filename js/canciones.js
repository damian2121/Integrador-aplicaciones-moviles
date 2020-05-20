$(function () {
    // const canciones = JSON.parse(localStorage.getItem('canciones'));
    $.get({
        url: 'https://api.spotify.com/v1/playlists/' + localStorage.getItem('myPlaylistId') + '/tracks',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
        .done(function (response) {
            $.each(response.items, function (i, item) {
                // var nameArtist = ' - ',
                // urlNameArtist = $('<li/>');
                // if (item.artists.length > 0) {
                //     $.each(item.artists, function (i, artist) {
                //         nameArtist += i == 0 ? artist.name : ', ' + artist.name;
                //         urlNameArtist.append(
                //             $('<span/>').text(i == 0 ? ', ' : ''),
                //             $('<a/>').text(artist.name).attr({ target: '_blank', href: artist.external_urls })
                //         );
                //     });
                // }
                console.log(item);
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
});

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
