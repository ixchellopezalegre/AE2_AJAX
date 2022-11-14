function validacion() {

    //Comprobamos si se rellenan los campos con los datos del cliente
    if (nombre.value.trim() == "") {
      alert ('¡¡¡ERROR!!! Debe de escribir el nombre del cliente.')
      return false;
    }
  
    if (direccion.value.trim() == "") {
      alert ('¡¡¡ERROR!!! Debe de escribir la direccion del cliente.')
      return false;
    }
  
    if (telefono.value.trim() == "") {
      alert ('¡¡¡ERROR!!! Debe de escribir el telefono del cliente.')
      return false;
    }
  
    if (email.value.trim() == "") {
      alert ('¡¡¡ERROR!!! Debe de escribir el correo electronico del cliente.')
      return false;
    }
  
    //Expresiones para validar los campos del formulario
    reNombre = /^[A-Z][A-z]+$/
    if(!nombre.value.match(reNombre)) {
      alert ('¡¡¡ERROR!!! Formato del nombre incorrecto. \nLa primera letra debe ser en mayuscula.')
      return false;
    }
  
    reTelefono = /^\d{9}$/
    if (!telefono.value.match(reTelefono)) {
      alert ('¡¡¡ERROR!!! Formato del telefono incorrecto. \nDebe de contener 9 numeros.')
      return false;
    }
  
    reEmail = /^(.+\@.+\..+)$/
    if (!email.value.match(reEmail)) {
      alert ('¡¡¡ERROR!!! Formato del correo electronico incorrecto. \nEj: nombre@dominio.com')
      return false;
    }
  
    //Comprobamos si se selecciona el tamaño de la pizza
    //pregunta = document.getElementsByName("tamano");
    //var seleccionado = false;
    //for (var i=0; i < pregunta.length; i++) {
    //  if (pregunta[i].checked) {
    //    seleccionado = true;
    //    break;
    //  }
    //}
  
    //if(!seleccionado) {
    //  alert ('¡¡¡ERROR!!! Debe de seleccionar el tamaño de la pizza.')
    //}
  
    //Comprobamos si se selecciona al menos un ingrediente
    //var form_data = new FormData(document.querySelector("form"));
      
    //if(!form_data.has("langs[]")) {
    //    document.getElementById("chk_option_error").style.visibility = "visible";
    //    return false;
    //  } else {
    //    document.getElementById("chk_option_error").style.visibility = "hidden";
    //    return true;
    //  }
  }
  
  formulario.onsubmit = validacion;