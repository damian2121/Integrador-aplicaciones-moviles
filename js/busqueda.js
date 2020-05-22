$(function () {
    var token = localStorage.getItem('token');
    showHistory();
    $('[name=history]').change(function () {
        showQuery();
    });
    $('[name=buscar-filtro]').click(function () {
        searchFilter(token, true, true);
    });
    $('.show-all').click(function () {
        searchFilter(token, false, false);
    });
});

function searchFilter(token, isAdd, limit) {
    var name = $('[name=name-filter]').val(),
        type = $('[name=type-filter]').val(),
        country = $('[name=country-filter]').val();

    if (limit && $('[name=limit-filter]').prop('checked')) {
        limit = 10;
        $('.show-all').show();
    } else {
        $('.show-all').hide();
        limit = 0;
    }
    filter(token, name, type, country, limit, isAdd);
}

function filter(token, name, type, country, limit, isAdd) {
    if (validarBusqueda()) {
        $('article').remove();
        var contentLimit = limit > 0 ? '&limit=10' : '',
            contentPais = country === '-' ? '' : '&market=' + country;
        $.get({
            url: `https://api.spotify.com/v1/search?q=${name}&type=${type}${contentPais}${contentLimit}`,
            headers: { Authorization: 'Bearer ' + token },
        })
            .done(function (response) {
                if (type === 'track') {
                    $.each(response.tracks.items, function (i, item) {
                        var urlImage = item.album.images.length === 0 ? null : item.album.images[0].url;
                        agregarItem(
                            item.name,
                            urlImage,
                            'Escuchar',
                            item.external_urls.spotify,
                            item.id,
                            'add',
                            item.uri
                        );
                    });
                } else {
                    var list =
                        type === 'artist' ? response.artists : type === 'album' ? response.albums : response.playlists;
                    $.each(list.items, function (i, item) {
                        var urlImage = item.images.length === 0 ? null : item.images[0].url;

                        agregarItem(
                            item.name,
                            urlImage,
                            'Ingresar',
                            item.external_urls.spotify,
                            item.id,
                            'search',
                            null,
                            item
                        );
                    });
                }

                if (isAdd) {
                    addQuery(name, type, country, limit);
                }
            })
            .fail(function (error) {
                Notificacion.onlyEliminar('error', 'Error', 'Ocurrio un error: ' + error.responseText);
            });
    }
}

function showHistory() {
    var listLastQuery = localStorage.getItem('query');
    if (listLastQuery == null) {
        $('.box-footer-campo').hide();
    } else {
        listLastQuery = JSON.parse(listLastQuery);
        $('[name=history]').find('option').remove();
        $.each(listLastQuery, function (i, query) {
            $('[name=history]').append($('<option />').val(JSON.stringify(query)).text(queryDateHours(query.date)));
        });
        $('.box-footer-campo').show();
    }
}

function addQuery(name, type, country, limit) {
    var lastQuery = {
        nameQuery: name,
        typeQuery: type,
        countryQuery: country,
        limitQuery: limit,
        date: new Date(),
    };
    var listQuerys = [],
        listLastQuery = localStorage.getItem('query');
    if (listLastQuery != null) {
        listQuerys = JSON.parse(listLastQuery);
        if (listQuerys.length == 5) {
            listQuerys.shift();
        }
    }
    listQuerys.push(lastQuery);
    localStorage.setItem('query', JSON.stringify(listQuerys));
    showHistory();
}

function showQuery() {
    var selectQuery = JSON.parse($('[name=history]').val());
    $('[name=name-filter]').val(selectQuery.nameQuery);
    $('[name=type-filter]').val(selectQuery.typeQuery);
    $('[name=country-filter]').val(selectQuery.countryQuery);
    $('[name=limit-filter]').prop('checked', selectQuery.limitQuery);
}

function queryDateHours(date) {
    var date = new Date(date);
    return (
        'Busqueda : ' +
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
    );
}
