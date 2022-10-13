function crearCuenta() {
    let nombre = document.getElementsByName("nombre")[0].value;
    let apellidos = document.getElementsByName("apellidos")[0].value;
    let fNacimiento = document.getElementsByName("fNacimiento")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let contrasenia = document.getElementsByName("contrasenia")[0].value;
    let recibirPublicidad = document.getElementsByName("recibir-publicidad")[0].checked ? "si" : "no";

    usuario = {
        nombre: nombre,
        apellidos: apellidos,
        fechaNacimiento: fNacimiento,
        email: email,
        contrasenia: contrasenia,
        recibirPublicidad: recibirPublicidad
    };

    if (sessionStorage.getItem("usuarios")) {
        let usuariosSesion = JSON.parse(sessionStorage.getItem("usuarios"));
        usuariosSesion[usuariosSesion.length] = usuario;
        sessionStorage.setItem("usuarios", JSON.stringify(usuariosSesion));
        console.log("N usuario en sesionStorage " + JSON.parse(sessionStorage.getItem("usuarios")));
    } else {
        sessionStorage.setItem("usuarios", JSON.stringify([usuario]));
        console.log("Primer usuario en sesionStorage " + JSON.parse(sessionStorage.getItem("usuarios")));
    }
}

function iniciarSesion() {
    let email = document.getElementsByName("email")[0].value;
    let contrasenia = document.getElementsByName("contrasenia")[0].value;
    let usuarios = JSON.parse(sessionStorage.getItem("usuarios"));
    let indice = 0;
    while (indice < usuarios.length) {
        if (email === usuarios[indice].email && contrasenia === usuarios[indice].contrasenia) {
            sessionStorage.setItem("sesionAbierta", "true");
            console.log(usuarios[indice].nombre + " ha sido autenticado correctamente!");
            sessionStorage.setItem("usuarioEnSesion", JSON.stringify(usuarios[indice]));
            console.log(JSON.parse(sessionStorage.getItem("usuarioEnSesion")).nombre);
            let origen = window.location.search.substring(1);
            window.location.reload();
            if (origen === "cesta") {
                window.location.href = "pasarela-de-pago.php";
            } else {
                window.location.href = "index.php";
            }
            break;
        }
        indice++;
    }
    if (sessionStorage.getItem("sesionAbierta") === "false") {
        console.log("Sus datos de identificación no son correctos.");
        console.log("Inténtelo de nuevo.");
    }
}
