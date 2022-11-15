import * as util from "./util.js";
import * as validacion from "./validacion.js";

window.onload = cargarDatos;

let infoPizza;
let ingredientes;
let restaurantes;

/**
 * Funcion que obtiene los datos del servidor
 * y carga los elementos relevantes de la pagina.
 */
async function cargarDatos() {
    console.log("Cargando los datos del servidor");
    //obtenemos los datos del servidor

    infoPizza = await util.enviarRequest("GET", "../server/pizzas.json");
    ingredientes = await util.enviarRequest("GET", "../server/ingredientes.json");
    restaurantes = await util.enviarRequest("GET", "../server/restaurantes.json");
    
    // llamamos a las funciones que cargaran los nodos html
    cargarIngredientes(ingredientes);
    cargarMasas(infoPizza.masas);
    cargarTamanios(infoPizza.tamanios);
    cargarRestaurantes(restaurantes);
    cargarInfo();

    agregarEventListeners();
}

let formulario = document.getElementById("formulario");

let campos = formulario.elements
console.log(campos);


const cargarIngredientes = (listaIngredientes) => {

    //Con esto eliminamos la lista de ingredientes existentes
    const ingredientesNode = document.getElementById("ingredientes");
    util.limpiarNodo(ingredientesNode, "p");

    //Recorremos la lista de ingredientes, generando los elementos 
    //en la seccion de ingrecientes del HTML

    listaIngredientes.forEach((ingrediente) => {
        //creamos un wrapper usado para el formato de cssaplicado
        const pWrapper = document.createElement("p");
         // pWrapper.className = 
        ingredientesNode.appendChild(pWrapper);

        //generamos un id (el nombre del ingrediente sin espacios)
        const idIng = `ing-${ingrediente.nombre.split(" ").join("")}`;
        //creamos el checkbox
        const chckbx = document.createElement("input");
        chckbx.setAttribute("type", "checkbox");
        chckbx.setAttribute("id", idIng);
        chckbx.setAttribute("name", ingrediente.nombre.split(" ").join(""));
        chckbx.setAttribute("value", "true");
        //situamos el checkbox en el documento
        pWrapper.appendChild(chckbx);

        //creamos el label
        const label = document.createElement("label");
        label.setAttribute("for", idIng);
        label.textContent = ingrediente.nombre;
        //Colocamos el label en el documento
        pWrapper.appendChild(label);

    });
    console.log("Ingredientes cargados");
};

const cargarMasas = (listaMasa) =>{
    //eliminamos la lista de masas existente
    const masaNode = document.getElementById("masas");
    util.limpiarNodo(masaNode, "p");

    listaMasa.forEach((masas)=> {
        //Creamos cada elemento p que va a contener un RB del tipo de masa
        const pWrapper = document.createElement("p");
        // pWrapper.className = 
        masaNode.appendChild(pWrapper);

        //Generamos un id que consistirá en el nombre del tipo de masa sin espacios
        const idMas = `mas-${masas}`;
        //Creamos los Radio Buttons
        const rdio = document.createElement("input");
        rdio.setAttribute("type","radio");
        rdio.setAttribute("id",idMas);
        rdio.setAttribute("name","masas");
        rdio.setAttribute("value",masas);
        //Colocamos los RB en el documento
        pWrapper.appendChild(rdio);

        //Creamos el label
        const label = document.createElement("label");
        label.setAttribute("for", idMas);
        label.textContent = masas;
        //Situamos la label en el documento
        pWrapper.appendChild(label);

    })
    console.log("Masas cargadas");
};

const cargarTamanios = (listaTamanios) => {
    //Eliminamos la lista de tamaños existente
    const tamanioNode = document.getElementById("tamanios");
    util.limpiarNodo(tamanioNode, "p");

    //Recorremos la lista de tamaños:
    listaTamanios.forEach((tamanios)=> {
        //Generamos un paragrafo p para cada tipo de tamaño 
        //en la sección correspondiente del HTML
        const pWrapper = document.createElement("p");
        //pWrapper.className =
        tamanioNode.appendChild(pWrapper);

        //Generamos un id que será el tamaño sin espacios
        const idTam = `tam-${tamanios.nombre}`;
        //Creamos los radio Buttons
        const rdio = document.createElement("input");
        rdio.setAttribute("type","radio");
        rdio.setAttribute("id",idTam);
        rdio.setAttribute("name","tamanios");
        rdio.setAttribute("value",tamanios.nombre);
        //Colocamos el RB en el documento
        pWrapper.appendChild(rdio);

        //Creamos el label
        const label = document.createElement("label");
        label.setAttribute("for", idTam);
        label.textContent = tamanios.nombre;
        //Colocamos el label en el documento
        pWrapper.appendChild(label);
    });
    console.log("Tamanios cargados");
};


const cargarRestaurantes = (listaRestaurantes) => {
    const restauranteNode = document.getElementById("restaurantes");
     util.limpiarNodo(restauranteNode, "select");

     const select = document.createElement("select");
     select.setAttribute("id", "restaurante");
     const option = document.createElement("option");
     option.setAttribute("value","default");
     let nombre = "Elige un restaurante";
        option.textContent = nombre;
     select.appendChild(option);
     listaRestaurantes.forEach((restaurantes)=> {
        restauranteNode.appendChild(select);

        let optionRes = document.createElement("option");
        optionRes.setAttribute("value", restaurantes.id );
        optionRes.textContent = restaurantes.nombre;
        
        select.appendChild(optionRes);
    });
    console.log("Restaurantes cargados");
};

/**
 * Funcion que limpia el notod del botón que contiene
 *  la informacion sobre el precio de la pizza.
 */
function cargarInfo (){

    console.log("Limpiando información del precio");
    const precioNode = document.getElementById("info");
    util.limpiarNodo(precioNode, "p");
    const pInfo = document.createElement("p");
    precioNode.appendChild(pInfo);
    pInfo.setAttribute("id", "info-precio");
    pInfo.setAttribute("class", "btn");
    console.log("Creando boton de precio nuevo");
};

/*
 * CALCULAR EL PRECIO DE LA PIZZA
 */

/**
 * Funcion que calcula el precio de la pizza 
 * segun la cantidad de ingredientes y el tamanio elegidos
 * @returns el precio
 */
export function calcularPrecio(){
    console.log("Calculando precio");
    let precio = 0;
    //Calculamos el precio del tamanio elegido
    const tamanioElegido = document.querySelector(
        'input[name="tamanios"]:checked'
    );
    if (tamanioElegido != null)
        precio += infoPizza.tamanios.find(
            //buscamos el tamanio con un nombre igual al que tenemos 
            (tam) => tam.nombre === tamanioElegido.value
        ).precio;
    
    //Calculamos el precio de los ingredientes
    const ingredientesElegidos = document.querySelectorAll(
        '#ingredientes input[type="checkbox"]:checked'
    );
    ingredientesElegidos.forEach((ingElegido) => {
        precio += ingredientes.find(
            (ing) => ing.nombre.split(" ").join("") === ingElegido.name
        ).precio;
    });

    //Por último aztualizamos el precio mostrado
    const infoPrecio = document.getElementById("info-precio");
    infoPrecio.textContent = `Precio: ${precio}\u20AC`;
    infoPrecio.classList.add("visible");
    
    console.log("El precio es: ", precio);
    return precio;
    
}

/**
 * Función que agrega los eventListeners a todos los elementos 
 * del formulario
 */
const agregarEventListeners = () => {
    //Asignamos los eventListeners
    submit.onclick = validacion.validarFormulario;

    //Validacion inmediata de nombre
    nombre.onkeyup = validacion.validarNombre;

     //Validacion inmediata de apellidos
    apellidos.onkeyup = validacion.validarApellidos;

    //Validacion inmediata de la direccion
    direccion.onkeyup = validacion.validarDireccion;

    //Validacion inmediata del telefono
    telefono.onkeyup = validacion.validarTlf;

    //Validacion inmediata del email
    email.onkeyup = validacion.validarEmail;

    //Validacion inmediata de los radio button tamanio
    //y actualizacion del precio
    const tamanioRB = document.getElementsByName("tamanios");
    for (var i = 0; i < tamanioRB.length; i++) {
        tamanioRB[i].onchange = calcularPrecio;
        tamanioRB[i].addEventListener("click", validacion.validarTamanio);
    }

    //Validacion inmediata de los radio button MASA
    const masaRB = document.getElementsByName("masas");
    for (var i = 0; i < masaRB.length; i++) {
        masaRB[i].addEventListener("click", validacion.validarMasa);
    }

    // Validacion inmediata del minimo de ingredientes
    //y actualizacion del precio
    const ingrCB = document.querySelectorAll(
        '#ingredientes input[type="checkbox"]'
    );
    ingrCB.forEach((chckbx) => {
        chckbx.onchange = calcularPrecio;
        chckbx.addEventListener("change", validacion.validarMinIngredientes);
    });

    //Validacion inmediata del restaurante
    restaurante.addEventListener("change", validacion.validarRestaurante) ;
    
    //validacion inmediata de los terminos y condiciones
    const terminos = document.getElementById("terminos");
    terminos.addEventListener("click", validacion.validarTerminos);

    //reseteo de todo el documento.
    const reset = document.getElementById("reset");
    reset.addEventListener("click", cargarInfo);

     //recarga de la pagina a partir del boton de refrescar
    const refrescar = document.getElementById("refresh");
    refrescar.onclick = cargarDatos;

};