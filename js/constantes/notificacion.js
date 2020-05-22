$(function () {
    $('#llama').click(() => {
        Notificacion.notificar(false, false, false, true, false, false, () => {
            alert('sdsdsd');
        });
    });
});
class Notificacion {
    static notificar(tipo, titulo, mensaje, botones = true, bt1, bt2, fn) {
        $('body').append(
            $('<div/>')
                .append(
                    $('<header/>')
                        .append($('<h3/>').text(titulo || 'Desea Continuar?'))
                        .attr({ id: 'notificaciones-header' }),
                    $('<section/>')
                        .append($('<div/>').append($('<span/>').text(mensaje || '! Desea Realizar la accion')))
                        .attr({ id: 'notificacion-seccion' }),
                    botones ? button(bt1, bt2, fn) : null
                )
                .addClass(tipo || 'success')
                .addClass('notificacion-contenedor')
                .attr({ id: 'contenedorNotificacion' })
                .hide()
                .fadeIn(1000)
        );
    }

    static onlyEliminar(tipo, titulo, mensaje, botones = true, bt1, bt2) {
        $('body').append(
            $('<div/>')
                .append(
                    $('<header/>')
                        .append($('<h3/>').text(titulo || 'Desea Continuar?'))
                        .attr({ id: 'notificaciones-header' }),
                    $('<section/>')
                        .append($('<div/>').append($('<span/>').text(mensaje || '! Desea Realizar la accion')))
                        .attr({ id: 'notificacion-seccion' }),
                    // .css('margin-bottom', '3rem'),
                    botones ? buttonOnly() : null
                )
                .addClass(tipo || 'success')
                .addClass('notificacion-contenedor')
                .attr({ id: 'contenedorNotificacion' })
                .hide()
                .fadeIn(1000)
        );
    }
}

function button(bt1, bt2, fn) {
    return $('<footer/>')
        .append(
            $('<button/>')
                .attr({ type: 'button', id: 'accion-continuar' })
                .text(bt1 || 'Continuar')
                .click(() => {
                    eliminar();
                    fn();
                }),
            $('<button/>')
                .attr({ type: 'button', id: 'accion-cancelar' })
                .text(bt2 || 'Cancelar')
                .click(() => {
                    eliminar();
                    return false;
                })
        )
        .attr({ id: 'notificacion-footer' });
}

function buttonOnly(bt1, bt2) {
    return $('<footer/>')
        .append(
            $('<button/>')
                .attr({ type: 'button', id: 'accion-continuar' })
                .text(bt1 || 'Continuar')
                .click(() => {
                    eliminar();
                    return true;
                })
        )
        .attr({ id: 'notificacion-footer' });
}

function eliminar() {
    $('#contenedorNotificacion').fadeOut('slow', function () {
        this.remove();
    });
}
