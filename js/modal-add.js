$(function () {
    var modal = $('#myModal');

    var btn = $('.myBtn');

    var span = $('#idCancelar, .close');

    span.click(() => modal.hide(1000));

    btn.click(() => modal.show('slow'));

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

    $('#agregar').click(function () {
        let form = $('#modal');
        const uri = $('.modal-content').children('h3').attr('id');

        form.find('select').each(function () {
            console.log(this.value);
            agregarCancion(this.value, uri);
        });
        modal.hide(1000);
    });
});

function agregarCancion(playlist, uri) {
    var settings = {
        url: `https://api.spotify.com/v1/playlists/${playlist}/tracks?uris=${uri}`,
        method: 'POST',
        timeout: 0,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
