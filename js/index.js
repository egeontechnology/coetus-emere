function valemail(email){
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    if (! emailRegex.test(email) && emailRegex.length != 0){
        swal("Error", "El correo electrónico no cumple el formato predefinido (xxxxxxxxxx@xxxxx.com)", "warning");
        document.getElementById("suscripcion_email").focus()
    }
}