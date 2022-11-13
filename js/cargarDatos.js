import * as util from "./util.js";
import * as validacion from "./validacion.js";

window.onload = cargarDatos;

let infoPizza;
let ingredientes;

async function cargarDatos() {

    infoPizza = await util.enviarRequest("GET", "../server/pizzas.json");
    ingredientes = await util.enviarRequest("GET", "../server/ingredientes.json")

    cargarIngredientes(ingredientes);
    cargarMasas(infoPizza.masas);
    cargarTamanios(infoPizza.tamanios);

    agregarEventListeners();
}

let formulario = document.getElementById("formulario")
let parametros = "";

let campos = formulario.elements
console.log(campos);

const cargarIngredientes = (listaIngredientes) => {
    //Con esto eliminamos la lista de ingredientes existentes
    const ingredientesNode = document.getElementById("ingredientes");
    util.limpiarNodo(ingredientesNode, "div");

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
};

const cargarMasas = (listaMasa) =>{
    //eliminamos la lista de masas existente
    const masaNode = document.getElementById("masas");
    util.limpiarNodo(masaNode, "div");

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
        rdio.setAttribute("name","masa");
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
};

const cargarTamanios = (listaTamanios) => {
    //Eliminamos la lista de tamaños existente
    const tamanioNode = document.getElementById("tamanios");
    util.limpiarNodo(tamanioNode, "div");

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
    console.log(ingredientesElegidos);
    ingredientesElegidos.forEach((ingElegido) => {
        precio += ingredientes.find(
            (ing) => ing.nombre.split(" ").join("") === ingElegido.name
        ).precio;
    });

    //Por último aztualizamos el precio mostrado
    const infoPrecio = document.getElementById("info-precio");
    infoPrecio.textContent = `Precio: ${precio}\u20AC`;
    infoPrecio.classList.add("visible");
    
    return precio;
    
}

/**
 * Función que agrega los eventListeners a todos los elementos 
 * del formulario
 */
const agregarEventListeners = () => {
    //Asignamos los eventListeners
    submit.onclick = validacion.validarFormulario;

    //validacion inmediata de los radio button tamanio
    //y actualizacion del precio
    const tamanioRadioButton = document.getElementsByName("tamanios");
    for (var i = 0; i < tamanioRadioButton.length; i++) {
        tamanioRadioButton[i].onchange = calcularPrecio;
        tamanioRadioButton[i].addEventListener("click", validacion.validarTamanio);
    }

    // validacion inmediata del minimo de ingredientes
    //y actualizacion del precio
    const ingrCheckbox = document.querySelectorAll(
        '#ingredientes input[type="checkbox"]'
    );
    ingrCheckbox.forEach((chckbx) => {
        chckbx.onchange = calcularPrecio;
        chckbx.addEventListener("change", validacion.validarMinIngredientes);
    });

     //recarga de la pagina a partir del boton de refrescar
    const refrescar = document.getElementById("refresh");
    refrescar.onclick = cargarDatos;

};