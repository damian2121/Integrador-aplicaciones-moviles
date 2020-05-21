const URL_SPOTIFY = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = 'YzQ0NGY5YzViOGVkNDI4MzgwZThjMTQ1M2EyODc4Y2I6MzFlMGRkYTYwZTFkNGNjOWIyNmEwZjJkOTE0MjhhMjE=';
const REDIRECT_URI = 'http://127.0.0.1:5500/inicio.html';
const GRANT_TYPE = 'authorization_code';

$(function () {
    $('.only-number').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

function agregarItem(name, urlImage, textExternalUrl, externalUrl, id, type, uri, item) {
    if (urlImage === null) urlImage = $('<i/>').addClass('fas fa-compact-disc fa-9x').addClass('playlist--content');
    else urlImage = $('<img/>').attr('src', urlImage).addClass('playlist--content');
    const button = buildButton(id, name, uri, type, urlImage, externalUrl, item);

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
    );
}
function buildButton(id, name, uri, type, urlImage, externalUrl, item) {
    const datosEnviar = { name, externalUrl };
    let button;
    var modal = $('#myModal');
    const iconoCompartir = $(`<i id=${id} />`)
        .addClass('fas fa-share-alt-square fa-2x')
        .click(() => {
            buildModalCompartir(name, datosEnviar);
            modal.show('slow');
        });
    if (type === 'add') {
        button = $('<div/>')
            .append(
                $(`<i id=${id} class='fas fa-plus-square fa-2x myBtn' />`).click((el) => {
                    buildModalAdd(name, uri);
                    modal.show('slow');
                }),
                iconoCompartir
            )
            .css({ display: 'flex', 'margin-top': '1rem', 'justify-content': 'space-evenly' });
    } else if (type === 'search') {
        button = $('<div/>')
            .append(
                $(`<i id=${id} class='fas fa-eye fa-2x myBtn' />`).click((el) => {
                    searchGeneral(item);
                    localStorage.setItem('route', 'search');
                }),
                iconoCompartir
            )
            .css({ display: 'flex', 'margin-top': '1rem', 'justify-content': 'space-evenly' });
    } else {
        button = $('<div/>')
            .append(
                $(`<i id=${id} />`)
                    .addClass('fas fa-outdent fa-2x')
                    .click((el) => {
                        localStorage.setItem('myPlaylistId', id);
                        localStorage.setItem('route', 'playlist');
                        $(location).attr('href', 'canciones.html');
                    }),
                $(`<i id=${id} />`)
                    .addClass('fas fa-trash-alt fa-2x')
                    .click((el) => {
                        deletePlaylist(el.target.id);
                    })
            )
            .css({ display: 'flex', 'margin-top': '1rem', 'justify-content': 'space-evenly' });
    }

    return button;
}

function validarBusqueda() {
    if ($('[name=name-filter]').val().length == 0) {
        alert('Debe completar el campo Nombre');
        return false;
    }
    return true;
}

function buildModalCompartir(name, datosEnviar) {
    $('#modal').remove();
    $('#contentmodal > h3').text(`Compartir : ${name}`),
        $('#contentmodal').append(
            $('<form id="modal"/>').append(
                $('<div/>').append(
                    $('<label/>').text('Correo origen:').attr('for', 'origen'),
                    $('<input/>').attr({ name: 'origen', type: 'text', id: 'origen' })
                ),
                $('<div/>').append(
                    $('<label/>').text('Correo destino:').attr('for', 'destino'),
                    $('<input/>').attr({ name: 'destino', type: 'text', id: 'destino' })
                ),
                $('<div/>').append(
                    $('<label/>').text('Mensaje').attr('for', 'mensaje'),
                    $('<textarea/>').attr({ name: 'mensaje', id: 'mensaje' })
                ),
                $('<div/>')
                    .append(
                        $('<button/>')
                            .attr('id', 'enviar')
                            .text('Enviar')
                            .addClass('form--button-form')
                            .click(function (e) {
                                enviarEmail(datosEnviar);
                                e.preventDefault();
                            }),
                        $('<button/>').attr({'type':'button','id':'idCancelar'}).text('Cancelar').addClass('form--button-form')
                    )
                    .addClass('form--button')
            )
        );
}

function buildModalAdd(name, uri) {
    $('#modal').remove();
    $('.modal-content').children('h3').text(`Agregar  ${name} a una Playlist`).attr('id', uri);
    $('#contentmodal').append(
        $('<form id="modal"/>').append(
            $('<div/>')
                .append(
                    $('<label/>').text('Seleccionar Playlist:').attr('for', 'playlist'),
                    $('<select/>').attr({ name: 'playlist', id: 'playlist' })
                )
                .addClass('form--campo'),
            $('<div/>')
                .append(
                    $('<button/>')
                        .attr('id', 'enviar')
                        .text('Agregar')
                        .addClass('form--button-form')
                        .click(function (e) {
                            var modal = $('#myModal');

                            var btn = $('.myBtn');

                            var span = $('#idCancelar, .close');

                            span.click(() => modal.hide(1000));

                            btn.click(() => modal.show('slow'));
                            let form = $('#modal');
                            const uri = $('.modal-content').children('h3').attr('id');

                            form.find('select').each(function () {
                                agregarCancion(this.value, uri);
                            });
                        }),
                    $('<button/>').attr({'type':'button','id':'idCancelar'}).text('Cancelar').addClass('form--button-form')
                )
                .addClass('form--button')
        )
    );
    mePlaylist();
}

function enviarEmail(datosEnviar) {
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    var origen = $('#origen').val();
    var destino = $('#destino').val();

    if (regex.test($('#origen').val().trim()) && regex.test($('#destino').val().trim())) {
        var mensaje = $('#mensaje').val();
        var href =
            'https://mail.google.com/mail?view=cm&tf=0' +
            (destino ? '&to=' + destino : '') +
            // (emailCC ? '&cc=' + emailCC : '') +
            // (emailSubject ? '&su=' + emailSubject : '') +
            (mensaje
                ? `&body=${mensaje} Escucha este Tema : ${datosEnviar.name}  Te dejo la URL : ${datosEnviar.externalUrl}`
                : '');
        window.open(href);
        event.preventDefault();
    } else {
        alert(' correo no valido');
    }
}

function valEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        return true;
    }
}

function mePlaylist() {
    $.get({
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
        .done(function ({ items }) {
            $.each(items, function (i, item) {
                $('#playlist').append(
                    $('<option>', {
                        value: item.id,
                        text: item.name,
                    })
                );
            });
        })
        .fail(function (error) {
            alert('No se ha podido cargar sus playlist: ' + error.responseText);
        });
}

function searchGeneral(item) {
    switch (item.type) {
        case 'artist':
            tracksGeneral(`https://api.spotify.com/v1/artists/${item.id}/top-tracks?country=from_token`, item.type);
            break;
        case 'playlist':
            tracksGeneral(`https://api.spotify.com/v1/playlists/${item.id}/tracks`, item.type);
            break;
        case 'album':
            // item.images[0]
            localStorage.setItem('album-image', item.images[0]);
            tracksGeneral(`https://api.spotify.com/v1/albums/${item.id}/tracks`, item.type);
            break;
        default:
            break;
    }
}

function tracksGeneral(url, type) {
    let res;

    $.get({
        url: url,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
        .done(function (response) {
            res = response;
            if (type === 'artist') {
                res = { items: response.tracks };
            }
            localStorage.setItem('busqueda', JSON.stringify(res.items));
            $(location).attr('href', 'canciones.html');
        })
        .fail(function (error) {
            alert('No se ha podido cargar sus playlist: ' + error.responseText);
        });
}

function agregarCancion(playlist, uri) {
    var modal = $('#myModal');


    $.post({
        url: `https://api.spotify.com/v1/playlists/${playlist}/tracks?uris=${uri}`,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
        .done(function (response) {
            modal.hide(1000);

            alert('cancion agregada');
        })
        .fail(function (error) {
            alert('No se ha podido cargar sus playlist: ' + error.responseText);
        });
}
