$(()=>{
    $("#enviar").on("click",function(){
        var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

        if (regex.test($('#origen').val().trim())&&regex.test($('#destino').val().trim())) {
            alert('Correo validado');
            var origen=  $("#origen").val();
            var destino= $("#destino").val();
            var mensaje= $("#mensaje").val()
            window.open('mailto:'+ destino +'?subject=Compartir&body='+ mensaje); 
    } else {
            alert(' correo no valido');
            return false;
        } 
                    
    });

  

});
