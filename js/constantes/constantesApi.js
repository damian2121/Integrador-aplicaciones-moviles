const URL_SPOTIFY = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = 'YzQ0NGY5YzViOGVkNDI4MzgwZThjMTQ1M2EyODc4Y2I6MzFlMGRkYTYwZTFkNGNjOWIyNmEwZjJkOTE0MjhhMjE=';
const REDIRECT_URI = 'http://127.0.0.1:5500/inicio.html';
const GRANT_TYPE = 'authorization_code';

function agregarItem(name, urlImage, textExternalUrl, externalUrl, id) {
    if (urlImage === null) urlImage = $('<i/>').addClass('fas fa-compact-disc fa-9x').addClass('playlist--content');
    else urlImage = $('<img/>').attr('src', urlImage).addClass('playlist--content');

    $('.prl-articles').append(
        $('<article/>')
            .append(
                urlImage,
                $('<figcaption/>').addClass('playlist--content').text(name),
                $('<a/>').text(textExternalUrl).attr({ target: '_blank', href: externalUrl }),
                $(`<button id=${id} />`)
                    .click((el) => {
                        deletePlaylist(el.target.id);
                    })
                    .text('Eliminar')
                    .addClass('button--delete')
            )
            .addClass('playlist--item')
    );
}
