import { calcularPrecio } from "./cargarDatos.js";
/**
 * VALIDACION FORMULARIO
 */

function validarFormulario(event) {
    let valido = true;
    if (!validarMinIngredientes()) valido = false;
    //if (!validarMasa()) valido = false;
   // if (!validarTamanio()) valido = false;

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
    //validarMasa,
    validarMinIngredientes
    //validarNombre,
    //validarRestaurante,
    //validarTamanio,
    //validarTerminos,
    //validarTlf,
  };