import { calcularPrecio } from "./cargarDatos.js";
/**
 * VALIDACION FORMULARIO
 */

function validarFormulario(event) {

    console.log("Validando los datos del formulario")
    console.log(" ");

    let valido = true;
    if (!validarNombre()) valido = false;
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
    const opcionesRestaurante = restaurante.querySelectorAll(
      'option:not([value=""])' //descartamos la opcion por defecto
    );

    for (const rest of opcionesRestaurante) {
      if (rest.selected) {
        if (restaurante.classList.contains("invalido"))
          restaurante.classList.remove("invalido");
        return true;
      }
    }
    restaurante.classList.add("invalido");
    return false;
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
    //validarApellidos,
    //validarEmail,
    //validarTlf,
    validarTamanio,
    validarMasa,
    validarMinIngredientes,
    validarRestaurante,
    validarTerminos
    
  };