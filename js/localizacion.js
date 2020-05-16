class Localizacion{

constructor(callback){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            this.latitude=  -34.922521;
            this.longitude= -57.956266;

            callback();
        });
        
    } else{
        alert("su navegador no es compatible con estas funciones, actualice su navegador.");

     }
                                
}

}