console.log("--------------peticiones AJAX---------------")



const URL_DESTINO = "http://localhost:5500/"   // Dirección url en la que tiene que buscar el recurso
const recurso = "lista.json"                   // Archivo JSon con los elementos de la carga diámica inicial
const RECURSO2 = "lista_refresh.json"          // Archivo con los precios modificados que se cargarán al ejecutar la función refrescar()
/*--------------------------------------------------------*/

/*realizamos una segunda llamada al presionar el boton y actualizamos los datos del archivo Json*/
function refrescar() {
      
    //obtenemos elementos legend para acceder y limpiar nodos de la carga previa
    var legend2 = document.getElementsByTagName("legend")[1]; 
    var legend3 = document.getElementsByTagName("legend")[2];   
   
   
   while (legend2.nextSibling && legend3.nextSibling) {  
     legend2.parentNode.removeChild(legend2.nextSibling); //elimina nodo "hermano" <ul>. 
     legend3.parentNode.removeChild(legend3.nextSibling); //elimina nodo "hermano" <ul>. 
     
    }
    var campo3 = document.getElementById("span_precio"); // Accedemos y borramos el contenido de la etiqueta "span" donde se mostraba el importe.
    campo3.innerHTML = "";

  
    let xmlHttp2 = new XMLHttpRequest() //Formamos el objeto XMLHttpRequest
    xmlHttp2.open('GET', URL_DESTINO + RECURSO2, true) //Indicamos el método, la dirección y el tipo de petición. Con true generamos una petición asíncrona.
    xmlHttp2.send(null);

    xmlHttp2.onreadystatechange = function () {
        

        if (this.readyState == 4 && this.status == 200) { //Cuando la respuesta este completa y su estado sea 200 (OK) leeremos el mensaje
            console.log("procesando peticion, paso: " + this.readyState);
              procesarRespuesta(this.responseText); //Obtenemos el  body del HTTP Response en bruto

        } else if (this.readyState != 4 && this.status != 200) { //Si falla la respuesta salta un alert indicando el error
            alert("error, no se pudo acceder a los datos")
        }


    }
}


//PRIMERA LLAMADA Y CARGA DE DATOS

window.addEventListener('load', function carga() {  // Nos aseguramos de que la función de carga se ejecute según se cargue la página.


    let xhttp = new XMLHttpRequest(); //creamos objeto para realizar PETICION al servidor
    xhttp.open('GET', URL_DESTINO + recurso, true); //peticion ASINCRONA (true)
    xhttp.send();

    xhttp.onreadystatechange = function () {    //obtenemos respuesta segun condiciones

        if (this.readyState == 4 && this.status == 200) {

            procesarRespuesta(this.responseText)


        } else {
            console.log("estado de peticion" + this.readyState)    //se procesa al llegar a 4.
        }
    }

})
/*---------------------- Funcion que carga elementos DOM a partir de doc. JSON. ------------------------- */
/*---- Mejor modular la funcion para poder reutilizarla ----*/

function procesarRespuesta(jsonDoc) {
    

    //convertimos el parametro a JSON
    var objetoJson = JSON.parse(jsonDoc)
    console.log(objetoJson)

    // creacion de NODOS con DOM
    var fieldset_1 = document.getElementById("bloque2");
    var fieldset_2 = document.getElementById("bloque3");
    var ul_1 = document.createElement("ul");
    //ul_1.setAttribute("id","lista1");
    var ul_2 = document.createElement("ul");
    //ul_1.setAttribute("id","lista2");
    var br = document.createElement("br")
    fieldset_1.appendChild(ul_1)
    fieldset_2.appendChild(ul_2)


    var arrayTamaño = objetoJson.PIZZA.TAMAÑO; //creacion ARRAY a partir de "lista.json"

    for (tamaño of arrayTamaño) {                           //recorremos lista y creamos NODOS tipo RADIO
        var etiquetaRadio = document.createElement("label");
        etiquetaRadio.innerHTML = "";                       //limpiamos etiqueta RADIO q contiene TAMAÑOS Y PRECIO
        var br = document.createElement("br")
        var texto = document.createTextNode((tamaño.NOMBRE) + " " + (tamaño.VALOR) + "€    ");
        etiquetaRadio.appendChild(texto);
        var selecttag1 = document.createElement("input");
        selecttag1.setAttribute("type", "radio");
        selecttag1.setAttribute("name", "btn_radio");
        selecttag1.setAttribute("value", tamaño.VALOR);
        ul_1.appendChild(selecttag1)
        ul_1.appendChild(etiquetaRadio)
        ul_1.appendChild(br)

    }

    var arrayIngredientes = objetoJson.PIZZA.INGREDIENTES;

    for (ingrediente of arrayIngredientes) {
        var etiquetaCheck = document.createElement("label");
        etiquetaCheck.innerHTML = "";
        var br = document.createElement("br")
        var texto = document.createTextNode((ingrediente.INGREDIENTE) + " " + (ingrediente.VALOR) + "€ ");
        etiquetaCheck.appendChild(texto);
        var selecttag2 = document.createElement("input");
        selecttag2.setAttribute("type", "checkbox");
        selecttag2.setAttribute("name", "btn_check");
        selecttag2.setAttribute("value", ingrediente.VALOR);
        ul_2.appendChild(selecttag2)
        ul_2.appendChild(etiquetaCheck)
        ul_2.appendChild(br)


    }

}
/*----------------FIN funcion PROCESAR RESPUESTA-----------------------*/


/*------------------FUNCIONES VALIDACION (actividad 3)-------------------------------------------------*/
function validar() {
    var formulario = document.getElementById("formulario"),
        nombre = formulario.nombre
    if (nombre.value == "" || nombre.length == 0) {
        alert("Debe rellenar el campo 'Nombre'.");
        return false;
    }
    else {
        var expresionNombre = ("^[A-Z][a-z]");
        var formatoNombre = document.getElementById("nombre").value;
        if (!formatoNombre.match(expresionNombre)) {
            alert("El formato del campo 'Nombre' es incorrecto");
            return false;
        }
        direccion = formulario.direccion
        if (direccion.value == "" || direccion.length == 0) {
            alert("Debe rellenar el campo  'Dirección'.");
            return false;
        }
        telefono = formulario.telefono
        if (telefono.value == "" || telefono.value == null) {
            alert("Debe rellenar el campo 'Teléfono'.");
            return false;
        }
        formatoTelefono = document.getElementById("telefono").value;
        var expresionTelefono = /^[9|6|7]{1}([\d]{2}[-]*){3}[\d]{2}$/
        if (!expresionTelefono.test(formatoTelefono)) {
            alert("El formato del campo 'Teléfono' es incorrecto");
            return false;
        }
        email = formulario.email
        if (email.value == "" || email.value == null) {
            alert("Debe rellenar el campo 'Email'.");
            return false;
        }
        formatoEmail = document.getElementById("email").value;
        var expresionMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (!expresionMail.test(formatoEmail)) {
            alert("El formato del campo 'Email' es incorrecto.");
            return false;

        } if (validar_radiobutton() == !true) {       //validacion radiobutton
            alert("Elija tamaño de la pizza ")
            return false;
        } if (validar_checkbox() == !true) {          //validación checkbox
            alert("Elija los ingredientes")
            return false;
        }
        alert("¡Pedido recibido! ¡Nos ponemos manos a la masa!")


    }
    //-----------------------FIN FUNCION VALIDAR--------------------

    //--------------------funcion VALIDAR RADIOBUTTON---------------
    function validar_radiobutton() {
        var radio = false;
        var input_radio = document.getElementsByName("btn_radio")

        for (i = 0; i < input_radio.length; i++) {
            if (input_radio[i].checked) {
                radio = true;
                break;
            }
        }
        return radio;
    }
    ////--------------------funcion VALIDAR CHECKBOX---------------

    function validar_checkbox() {
        var input_checkbox = document.getElementsByName("btn_check")
        ch = false;
        for (i = 0; i < input_checkbox.length; i++) {
            if (input_checkbox[i].checked == true) {

                ch = true;
            }
        }
        return ch;
    }
}
//--------------------FUNCION SUMAR para mostrar precios---------------
//función que suma las opciones marcadas en radiobutton y checkbox
function suma(radio, checkbox) {

    var resultado = radio + checkbox
    return resultado;
}
//------------------funcion MOSTRAR PRECIOS-------------------------
function mostrar_precios() {

    //obtener valores de radiobutton
    var radio = document.getElementsByName("btn_radio")
    var precio_radio = 0;
    for (i = 0; i < radio.length; i++) {
        if (radio[i].checked == true) {

            precio_radio = parseInt(radio[i].value);  //obtiene precio de la opcion marcada.
        }
    }
    //obtener valores de checkbox

    var checkbox = document.getElementsByName("btn_check")
    var precio_ch = 0;
    for (i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {  // se comprueba si está checkeado

            precio_ch = precio_ch + parseInt(checkbox[i].value); //acumulador del valor/valores en checkbox marcados que representa el precio
        }
    }

    //se suman los precios obtenidos de RADIOBUTTON y CHECKBOX con la función SUMAR() y se muestra un mensaje;
    let rdo_suma = suma(precio_radio, parseInt(precio_ch))
    span_precio.innerHTML = "El precio total de la selección es " + rdo_suma + "€"

}

//------------------------------------FIN FUNCIONES------------------------------------------------------

//asignacioneaddEventListener s. CARGA LA PÁGINA
window.addEventListener("load", function(){

    //muestra el precio al presionar el boton VER PRECIO
    btn_precio.onclick = function () {
        mostrar_precios();
    }
    

    //si la función VALIDAR devuelve true, se envian los datos
    formulario.submit = validar;

    //prevenimos que el evento envie por defecto los datos si la función VALIDAR retorna false;
    submit.onclick = function (e) {
        if (!validar()) {
            e.preventDefault();
        }
    };
    btn_refrescar.onclick = function () {
        refrescar();
    }
})

/*-------------------------------------------------------------*/


