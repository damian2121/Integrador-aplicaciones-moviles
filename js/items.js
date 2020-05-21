function agregarItem(name, urlImage, textExternalUrl, externalUrl) {
    alert(9);
    if (urlImage === null) urlImage = $('<i/>').addClass('fas fa-compact-disc fa-9x').addClass('playlist--content');
    else urlImage = $('<img/>').attr('src', urlImage).addClass('playlist--content');

    $('.prl-articles').append(
        $('<article/>')
            .append(
                urlImage,
                $('<figcaption/>').addClass('playlist--content').text(name),
                $('<a/>').text(textExternalUrl).attr({ target: '_blank', href: externalUrl })
            )
            .addClass('playlist--item')
    );
}
