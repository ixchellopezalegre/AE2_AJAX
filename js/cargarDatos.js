import * as util from "./util.js";

window.onload = cargarDatos;

let infoPizza;
let ingredientes;

async function cargarDatos() {

    infoPizza = await util.enviarRequest("GET", "../server/pizzas.json");
    ingredientes = await util.enviarRequest("GET", "../server/ingredientes.json")

}
