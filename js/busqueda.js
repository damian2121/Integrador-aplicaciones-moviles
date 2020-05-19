$(function () {
    var token = localStorage.getItem('token');
    $("[name=buscar-filtro]").click(function(){
        var name= $("[name=name-filter]").val(), type = $("[name=type-filter]").prop("checked") ? 'track' : 'artist';
        filter(token,name,type);
    });
});

function filter(token, name, type) {
    $('article').remove();
    $.get({ url: 'https://api.spotify.com/v1/search?q='+name+'&type='+ type, headers: { Authorization: 'Bearer ' + token } })
        .done(function (response) {
            if(type === 'track'){
                $.each(response.tracks.items, function (i, item) {
                    var urlImage = item.album.images.length === 0 ? null : item.album.images[0].url;
                    agregarItem(item.name, urlImage, 'Escuchar', item.external_urls.spotify);
                });
            }
            else if(type === 'artist'){
                $.each(response.artists.items, function (i, item) {
                    var urlImage = item.images.length === 0 ? null : item.images[0].url;
                    agregarItem(item.name, urlImage, 'Ver artista', item.external_urls.spotify);
                });
            }
        })
        .fail(function (error) {
            alert('No se ha podido cargar sus playlist: ' + error.responseText);
        });
}