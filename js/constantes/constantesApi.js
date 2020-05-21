const URL_SPOTIFY = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = 'YzQ0NGY5YzViOGVkNDI4MzgwZThjMTQ1M2EyODc4Y2I6MzFlMGRkYTYwZTFkNGNjOWIyNmEwZjJkOTE0MjhhMjE=';
const REDIRECT_URI = 'http://127.0.0.1:5500/inicio.html';
const GRANT_TYPE = 'authorization_code';

$(function () {
    $('.only-number').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

function agregarItem(name, urlImage, textExternalUrl, externalUrl, id, type, uri) {
    if (urlImage === null) urlImage = $('<i/>').addClass('fas fa-compact-disc fa-9x').addClass('playlist--content');
    else urlImage = $('<img/>').attr('src', urlImage).addClass('playlist--content');
    const button = buildButton(id, name, uri, type, urlImage, externalUrl);

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
function buildButton(id, name, uri, type, urlImage, externalUrl) {
    const datosEnviar = { name, externalUrl };
    let button;
    var modal = $('#myModal');
    if (type === 'add')
        button = $('<div/>')
            .append(
                $(`<i id=${id} class='fas fa-plus-square fa-2x myBtn' />`).click((el) => {
                    // $('.modal-content').children('h3').text(`Agregar  ${name} a una Playlist`).attr('id', uri);
                    buildModalAdd(name, uri);
                    modal.show('slow');
                }),
                // .text('Agregar')
                // .addClass('button--delete'),
                $(`<i id=${id} />`)
                    .addClass('fas fa-share-alt-square fa-2x')
                    .click(() => {
                        localStorage.setItem('compartir', JSON.stringify(datosEnviar));
                        buildModalCompartir(name, datosEnviar);
                        modal.show('slow');
                    })
            )
            .css({ display: 'flex', 'margin-top': '1rem', 'justify-content': 'space-evenly' });
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
                        $('<button/>').attr('id', 'idCancelar').text('Cancelar').addClass('form--button-form')
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
                    $('<label/>').text('Correo origen:').attr('for', 'playlist'),
                    $('<select/>').attr({ name: 'playlist', id: 'playlist' })
                )
                .addClass('form--campo'),
            $('<div/>')
                .append(
                    $('<button/>').attr('id', 'enviar').text('Agregar').addClass('form--button-form'),
                    // .click(function (e) {
                    //     enviarEmail(datosEnviar);
                    //     e.preventDefault();
                    // }),
                    $('<button/>').attr('id', 'idCancelar').text('Cancelar').addClass('form--button-form')
                )
                .addClass('form--button')
        )
    );
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
