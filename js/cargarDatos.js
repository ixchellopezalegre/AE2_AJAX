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

/**
 * Función que agrega los eventListeners a todos los elementos 
 * del formulario
 */
const agregarEventListeners = () => {
    //Asignamos los eventListeners
    //submit.onclick = validacion.validarFormulario;

     //recarga de la pagina a partir del boton de refrescar
    const refrescar = document.getElementById("refresh");
    refrescar.onclick = cargarDatos;

};