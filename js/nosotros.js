function initMap(){
    const ubicacion= new Localizacion(()=>{
        const mylatlng={
            lat: ubicacion.latitude,
            lng: ubicacion.longitude
        };
        var texto= '<h1> Aquí estamos</h1>'
        const options= {
            center: mylatlng,
            zoom: 15
        }
        var map= document.getElementById('map');
        const mapa= new google.maps.Map(map,options);
        const marcador= new google.maps.Marker({
            position: mylatlng,
            map: mapa,
            title: "aqui estamos"
        });
    });
}