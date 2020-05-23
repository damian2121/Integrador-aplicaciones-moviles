$(function () {
    var modal = $('#myModal');

    var btn = $('#myBtn');

    var span = $('#idCancelar, .close');

    span.click(() => modal.hide(1000));

    btn.click(() => modal.show('slow'));
    $('#enviar').click(function () {
        let modal = $('#modal');
        let data = {};

        modal.find('input').each(function () {
            if (this.type === 'checkbox') {
                data[`${this.name}`] = this.checked;
            } else {
                data[`${this.name}`] = this.value;
            }
        });
        if (valModal()) {
            crearPlaylist(data);
        }
    });
});

function valModal() {
    if ($('#name').val() == '') {
        Notificacion.onlyEliminar('info', 'Revise los campos', 'Debe completar el campo Nombre');
        return false;
    } else {
        return true;
    }
}
