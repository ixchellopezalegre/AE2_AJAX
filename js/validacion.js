import { calcularPrecio } from "./cargarDatos.js";
/**
 * VALIDACION FORMULARIO
 */

function validarFormulario(event) {

    console.log("Validando los datos del formulario")
    console.log(" ");

    let valido = true;
    if (!validarNombre()) valido = false;
    if (!validarApellidos()) valido = false;
    if (!validarDireccion()) valido = false;
    if (!validarTlf()) valido = false;
    if (!validarEmail()) valido = false;
    if (!validarMinIngredientes()) valido = false;
    if (!validarMasa()) valido = false;
    if (!validarTamanio()) valido = false;
    if (!validarRestaurante()) valido = false;
    if (!validarTerminos()) valido = false;

    if(!valido) {
        alert("Parece que hay errores en el formulario");
        event.preventDefault();
    } else if (
        !confirm(`Pedir pizza por un precio de ${calcularPrecio()}\u20AC?`)
    ) {
        event.preventDefault();
    }
}

/*
 *============= Validacion nombre =============
 */
/**
 * Funcion que verifica que el nombre tiene un formato válido además de eliminar espacios innecesarios
 * @returns true si el nombre es válido, false si no
 */

 function validarNombre() {
  const mensaje = document.getElementById("mensaje-nombre");

  // Con esta línea de código eliminamos los espacios que pueda haber al principio o al final para no tenerlos en cuenta
  //de cara a compararlo con el patrón siguiente
  const nombreUsuario = nombre.value.replace(/\s/g, "");

  // La expresión regular usada tanto en validarNombre() como en validarApellidos() incluye acentos y también la ñ
  //También se asegura de que la primera letra del nombre y apellido sea una mayúscula
  //Del mismo modo se asegura de que el input no se componga solo de espacios en blanco
  const pattern =
    /(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;


    if (nombre.value == "" || (nombre.value.trim())== "") {
      mensaje.textContent = 'Debes rellenar el nombre'
      setTimeout( function(){
        mensaje.textContent = ''
    }, 3000)
    return false;
}
  //A través de test comparamos el input con el patrón (al cual se le han eliminado los espacios)
  const valido = pattern.test(nombreUsuario);

  // Si el test devuelve false, aparecerá un mensaje de error que pedirá un input diferente
  if (!valido) {
    nombre.classList.add("invalido");
    mensaje.textContent = "Introduce un nombre válido";
  } else {
    if (nombre.classList.contains("invalido"))
      nombre.classList.remove("invalido");
      mensaje.textContent = "";
  }
  return valido;
}

/*
 *============= Validacion apellidos =============
 */

/**
 * Funcion que verifica que los apellidos tienen un formato válido además de eliminar espacios innecesarios
 * @returns true si el apellido es válido, false si no
>>>>>>> Stashed changes
 */

function validarApellidos() {
  const mensaje = document.getElementById("mensaje-apellidos");
  const apellidosUsuario = apellidos.value.replace(/\s/g, "");
  const pattern =
    /(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

    const valido = pattern.test(apellidosUsuario);
    if (apellidos.value == "" || (apellidos.value.trim())== "") {
      mensaje.textContent = 'Debes rellenar el apellido'
      setTimeout( function(){
        mensaje.textContent = ''
    }, 3000)
    return (false);
    }

    if (!valido) {
      apellidos.classList.add("invalido");
      mensaje.textContent = "Introduce un apellido válido";
    } else {
      if (nombre.classList.contains("invalido"))
        apellidos.classList.remove("invalido");
        mensaje.textContent = "";
    }
    return valido;
}

/*
 *============= Validacion direccion =============
 */
/**
 * Funcion que verifica que la direccion cumple los siguientes requisitos:
 *    - El campo contiene caracteres (no está relleno únicamente de espacios)
 *    - Debe contener al menos: una mayúscula, un número
 *    - La longitud mínima de la cadena es 20 caracteres
 *    - La longitud máxima es 150 caracteres. Esto viene definido con el atributo "maxLength" en el HTML.
 * @returns true si la direccion es valida, false si no
 */

 function validarDireccion() {
  //Seleccionamos el primer nodo hijo que deriva del nodo <p></p> cuya clase es "mensaje-error direccion-error"
  const mensaje = document.getElementById("mensaje-direccion");
  let valido = false;
  const pattern = /^[A-Z]{1,}[0-9]{1,}/;

  //En primer lugar, eliminamos los espacios duplicados y los espacios al comienzo y al final del input
  let direccionUsuario = (direccion.value.trim())
  .replace(/ {2,}/g, " ");

  if (direccion.value == "" || (direccion.value.trim())== "") {
    mensaje.textContent = 'Debes rellenar la dirección'
    setTimeout( function(){
      mensaje.textContent = ''
  }, 3000)
  return false;
  }

  //En segundo lugar, comprobamos que el input contiene, al menos, 40 caracteres y contiene una mayus y un numero
  if (direccionUsuario.length < 20 && pattern.test(direccionUsuario) == false) {
    valido = false;
  } else {
    valido = true;
  }

  //Validamos el contenido final
  if (!valido) {
    direccion.classList.add("invalido");
    mensaje.textContent = "El campo direccion debe contener min 20 caracteres, un numero y comenzar con una mayuscula";
  
  } else {
    if (direccion.classList.contains("invalido")) {
      direccion.classList.remove("invalido");
      mensaje.textContent = "";
    }
  }

  return valido;
}

/*
 *============= Validacion telefono =============
 */

/**
 * Funcion que verifica que el telefono tiene el formato de un movil espaniol
 * @returns true si el numero de telefono es valido, false si no
 */
 function validarTlf() {
  const mensaje = document.getElementById("mensaje-telefono");

  let tfnUsuario = telefono.value.replace(/\s/g, ""); //elimina todos los espacios del input
  const pattern = /^[0-9]{9}$/;

  // si estamos validando al teclear, modificamos el patron
  // para ajustarse a la longitud del input del usuario 
  if (telefono.value == "" || (telefono.value.trim())== "") {
    mensaje.textContent = 'Debes introducir un teléfono'
    setTimeout( function(){
      mensaje.textContent = ''
  }, 3000)
  return false;
  }

  //comparamos el telefono introducido con el formato esperado
  const valido = pattern.test(tfnUsuario);
  if (!valido) {
    telefono.classList.add("invalido");
    mensaje.textContent =
      "Introduce un telefono movil de 9 digitos";
  } else {
    if (telefono.classList.contains("invalido"))
      telefono.classList.remove("invalido");
      mensaje.textContent = "";
  }
  return valido;
}


/*
 *============= Validacion email =============
 */
/**
 * Funcion que verifica que el email cumple los siguientes requisitos:
 *    + Elimina cualquier espacio introducido.
 *    + Debe contener solo una "@".
 *    + Permitir la inclusión de: caracteres del abecedario, en mayusculas o minusculas, números, ".", "-" y "_"
 *    + Debe contener al menos un punto.
 *    + La "@" y el punto no puden estar inmediatamente juntos.
 * @returns true si el email es válido, false si no
 */

 function validarEmail() {
 
  const mensaje = document.getElementById("mensaje-email");

  /* El primer bloque que va desde el primer caracter hasta el anterior de la "@"
   * debe tener al menos un caracter en minisculas, mayusculas, numerico o un punto, guion o barra baja.
   * El bloque que va desde el caracter después de la "@" y hasta el punto
   * debe tener al menos un caracter en minisculas, mayusculas, numerico o un guion.
   *  Detras del punto puede haber 2, 3 o 4 caracteres en mayúsculas o minusculas.
   */
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
  //En primer lugar, eliminamos cualquier espacio introducido
  let emailUsuario = email.value.replace(/\s/g, "");

    if (email.value == "" || (email.value.trim())== "") {
      mensaje.textContent = 'Debes introducir un email'
      setTimeout( function(){
        mensaje.textContent = ''
    }, 3000)
    return false;
    }

    //comparamos el email introducido con el formato esperado
    const valido = pattern.test(emailUsuario);
    //Validamos el contenido final
    if (!valido) {
      email.classList.add("invalido");
      mensaje.textContent =
        "El email no tiene el formato correcto";
    } else {
      if (email.classList.contains("invalido"))
        email.classList.remove("invalido");
        mensaje.textContent = "";
    }
    console.log("El mensaje despues: ",mensaje)
    return valido;
}


/*

 *============= Validacion Radio buttons: tipos de masa y tamanio =============
 */

 /**
 * Funcion que verifica que se ha seleccionado únicamente un tipo de masa.
 * @returns true si se han aceptado, false si no
 */

function validarMasa() {
    let valido = false;
    const mensaje= document.getElementById("mensaje-masa");
    const masaRB = document.getElementsByName("masas");
  
    // Iteramos por los radio button para ver si alguno esta marcado
    for (var i = 0; i < masaRB.length; i++) {
      if (masaRB[i].checked) {
        valido = true;
        break;
      }
    }
  
    // Iteramos por los radio button para aniadir o quitar la clase "invalido"
    for (var j = 0; j < masaRB.length; j++) {
      if (!valido) {
        masaRB[j].classList.add("invalido");
      } else if (masaRB[j].classList.contains("invalido")) {
        masaRB[j].classList.remove("invalido");
      }
    }
  
    //Editamos el mensaje de error segun el resultado de la validacion
    if (valido) mensaje.textContent = "";
    else mensaje.textContent = "Elige el tipo de masa";
  
    return valido;
  }

/**
 * Funcion que verifica que se ha seleccionado únicamente un tamanio.
 * @returns true si se han aceptado, false si no
 */
 function validarTamanio() {
    let valido = false;
    const mensaje = document.getElementById("mensaje-tamanio");
    const tamanioRB = document.getElementsByName("tamanios");
  
    // Iteramos por los radio button para ver si alguno esta marcado
    for (var i = 0; i < tamanioRB.length; i++) {
      if (tamanioRB[i].checked) {
        valido = true;
        break;
      }
    }
  
    // Iteramos por los radio button para aniadir o quitar la clase "invalido"
    for (var j = 0; j < tamanioRB.length; j++) {
      if (!valido) {
        tamanioRB[j].classList.add("invalido");
      } else if (tamanioRB[j].classList.contains("invalido")) {
        tamanioRB[j].classList.remove("invalido");
      }
    }
  
    //Editamos el mensaje de error segun el resultado de la validacion
    if (valido) mensaje.textContent = "";
    else mensaje.textContent = "Elige el tamaño de la pizza";
  
    return valido;
  }
/*
 *============= Validacion minimo ingredientes =============
 */
/**
 * Funcion que valida que hay al menos un ingrediente seleccionado
 * @returns true si al menos un ingrediente ha sido seleccionado, false si no
 */

 function validarMinIngredientes() {
    let valido = false;
    const mensaje = document.getElementById('mensaje-ingredientes')
  
    const ingrCheckbox = document.querySelectorAll(
      '#ingredientes input[type="checkbox"]'
    );
    console.log(ingrCheckbox);
    // iteramos por las checkboxes para ver si alguna esta marcada
    // y actualizar el resultado de la validacion
    for (let chckbx of ingrCheckbox) {
      if (chckbx.checked) {
        valido = true;
        break;
      }
    }
  
    // iteramos por las checkboxes para aniadir o quitar la clase "invalido"
    // segun el resultado de la validacion
    ingrCheckbox.forEach((chckbx) => {
      if (!valido) chckbx.classList.add("invalido");
      else if (chckbx.classList.contains("invalido"))
      chckbx.classList.remove("invalido");
    });
  
    // editamos el mensaje de error segun el resultado de la validacion
    if (valido) mensaje.textContent = "";
    else mensaje.textContent = "Elige al menos un ingrediente para tu pizza";
  
    return valido; //devolvemos el resultado de la validacion
  }


  /*
 *============= Validacion restaurante =============
 */

/**
 * Funcion que verifica que hay un restaurante seleccionado
 * @returns true si se ha elegido restaurante, false si no
 */
 function validarRestaurante() {

  const mensaje = document.getElementById("mensaje-restaurante");
  let valido = false;
  const opcionesRestaurante = restaurante.querySelectorAll(
      'option:not([value=""])' //descartamos la opcion por defecto
  );

    for (const rest of opcionesRestaurante) {
      if (rest.selected) {
        valido = true;
        break;
      }
    }
    
      if (!valido) {
        restaurante.classList.add("invalido");
        mensaje.textContent = "Elige el restaurante al que quieres pedir";

      }else if (restaurante.classList.contains("invalido")){
        restaurante.classList.remove("invalido");
        mensaje.textContent = "";

      }
    
    return valido;
}

/*
 * ============= Validacion terminos =============
 */

  /**
 * Funcion que verifica que los terminos y condiciones han sido aceptados
 * @returns true si se han aceptado, false si no
 */
function validarTerminos() {
    const mensaje = document.getElementById("mensaje-terminos");
  
    if (!terminos.checked) {
      terminos.classList.add("invalido");
      mensaje.textContent =
        "Es necesario aceptar los terminos y condiciones antes de realizar el pedido";
    } else {
      if (terminos.classList.contains("invalido"))
        terminos.classList.remove("invalido");
        mensaje.textContent = "";
    }

    return terminos.checked;
  }

  export {
    validarFormulario,
    validarNombre,
    validarApellidos,
    validarDireccion,
    validarTlf,
    validarEmail,
    validarTamanio,
    validarMasa,
    validarMinIngredientes,
    validarRestaurante,
    validarTerminos
    
  };