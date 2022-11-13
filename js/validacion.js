import { calcularPrecio } from "./cargarDatos.js";
/**
 * VALIDACION FORMULARIO
 */

function validarFormulario(event) {

    console.log("Validando los datos del formulario")
    console.log(" ");

    let valido = true;
    if (!validarMinIngredientes()) valido = false;
    if (!validarMasa()) valido = false;
    if (!validarTamanio()) valido = false;

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

 *============= Validacion Radio buttons: tamanio y tipo de masa =============
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

  export {
    //validarApellidos,
    //validarEmail,
    validarFormulario,
    validarMasa,
    validarMinIngredientes,
    //validarNombre,
    //validarRestaurante,
    validarTamanio
    //validarTerminos,
    //validarTlf,
  };