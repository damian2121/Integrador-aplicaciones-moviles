const URL_SPOTIFY = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = 'YzQ0NGY5YzViOGVkNDI4MzgwZThjMTQ1M2EyODc4Y2I6MzFlMGRkYTYwZTFkNGNjOWIyNmEwZjJkOTE0MjhhMjE=';
const REDIRECT_URI = 'http://127.0.0.1:5500/inicio.html';
const GRANT_TYPE = 'authorization_code';

function agregarItem(name, urlImage, textExternalUrl, externalUrl, id, type, uri) {
    if (urlImage === null) urlImage = $('<i/>').addClass('fas fa-compact-disc fa-9x').addClass('playlist--content');
    else urlImage = $('<img/>').attr('src', urlImage).addClass('playlist--content');
    const button = buildButton(id, name, uri, type);

    $('.prl-articles').append(
        $('<article/>')
            .attr('id', id)
            .append(
                urlImage,
                $('<figcaption/>').addClass('playlist--content').text(name),
                $('<a/>').text(textExternalUrl).attr({ target: '_blank', href: externalUrl }),
                button
            )
            .addClass('playlist--item')
        // .click(function () {
        //     buildClickArticle(type, id);
        // })
    );
}

function buildButton(id, name, uri, type) {
    let button;
    if (type === 'add')
        button = $(`<button id=${id} class='myBtn' />`)
            .click((el) => {
                var modal = $('#myModal');
                $('.modal-content').children('h3').text(`Agregar  ${name} a una Playlist`).attr('id', uri);
                modal.show('slow');
            })
            .text('Agregar')
            .addClass('button--delete');
    else
        button = $('<div/>')
            .append(
                $(`<i id=${id} />`)
                    .addClass('fas fa-outdent fa-2x')
                    .click((el) => {
                        localStorage.setItem('myPlaylistId', id);
                        $(location).attr('href', 'canciones.html');
                    }),
                $(`<i id=${id} />`)
                    .addClass('fas fa-trash-alt fa-2x')
                    .click((el) => {
                        deletePlaylist(el.target.id);
                    })
            )
            .css({ display: 'flex', 'margin-top': '1rem', 'justify-content': 'space-evenly' });
    // .text('Eliminar')
    // .addClass('button--delete');
    return button;
}
