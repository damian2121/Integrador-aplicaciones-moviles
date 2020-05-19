$(function () {
    var token = localStorage.getItem('token');
    mePlayList(token);
});

function mePerfil(token) {
    $.get({ url: 'https://api.spotify.com/v1/me', headers: { Authorization: 'Bearer ' + token } })
        .done(function (response) {
            console.log('cargar los datos personales');
        })
        .fail(function (error) {
            alert('No se ha podido cargar los datos personales: ' + error.responseText);
        });
}

function mePlayList(token) {
    $.get({ url: 'https://api.spotify.com/v1/me/playlists', headers: { Authorization: 'Bearer ' + token } })
        .done(function (response) {
            $.each(response.items, function (i, item) {
                if (item.images.length === 0) {
                    $('.prl-articles').append(
                        $('<article/>')
                            .append(
                                $('<i/>').addClass('fas fa-compact-disc fa-9x').addClass('playlist--content'),
                                $('<figcaption/>').text(item.name).addClass('playlist--content'),
                                $('<a/>')
                                    .text('Ingresar a la Playlist')
                                    .attr({ target: '_blank', href: item.external_urls.spotify })
                            )
                            .attr({ title: 'Playlist ' + item.name + ' en Spotify' })
                            .addClass('playlist--item')
                    );
                } else {
                    $('.prl-articles').append(
                        $('<article/>')
                            .append(
                                $('<img/>').attr('src', item.images[0].url).addClass('playlist--content'),
                                $('<figcaption/>').addClass('playlist--content').text(item.name),
                                $('<a/>')
                                    .text('Ingresar a la Playlist')
                                    .attr({ target: '_blank', href: item.external_urls.spotify })
                            )
                            .attr({ title: 'Playlist ' + item.name + ' en Spotify' })
                            .addClass('playlist--item')
                    );
                }
            });
        })
        .fail(function (error) {
            alert('No se ha podido cargar sus playlist: ' + error.responseText);
        });
}

function tracksForPlayList(token, idPlayList) {
    $.get({
        url: 'https://api.spotify.com/v1/playlists/' + idPlayList + '/tracks',
        headers: { Authorization: 'Bearer ' + token },
    })
        .done(function (response) {
            $.each(response.items, function (i, item) {
                var nameArtist = ' - ',
                    urlNameArtist = $('<li/>');
                if (item.artists.length > 0) {
                    $.each(item.artists, function (i, artist) {
                        nameArtist += i == 0 ? artist.name : ', ' + artist.name;
                        urlNameArtist.append(
                            $('<span/>').text(i == 0 ? ', ' : ''),
                            $('<a/>').text(artist.name).attr({ target: '_blank', href: artist.external_urls })
                        );
                    });
                }
                $('.prl-articles').append(
                    $('<li/>')
                        .append(
                            $('<a/>')
                                .text(item.tracks.name + nameArtist)
                                .attr({ target: '_blank', href: item.tracks.external_urls })
                        )
                        .attr({ title: 'Pista ' + item.tracks.name + ' en Spotify' })
                );
            });
        })
        .fail(function (error) {
            alert('No se ha podido cargar sus playlist: ' + error.responseText);
        });
}
