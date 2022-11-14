const urlDestino = "http://127.0.0.1:5500/AE4_AJAX/"
const recurso = "pizza.json"

function enviarPeticionAsincrona() {

    let xmlHttp = new XMLHttpRequest()

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log(this.responseText)
                listarTamanos(this.responseText)
            } else {
                alert("Error al obtener respuesta del servidor")
            }
        }
    }

    xmlHttp.open('GET', recurso, true)
    xmlHttp.send(null)
    
}

function listarTamanos(jsonDoc) {
    var objetoJson = JSON.parse(jsonDoc)
    var table = "<tr><th>Tamaño</th><th>Precio</th><th>Anadir</th></tr>";
    var arrayPizzas = objetoJson;

var len = arrayPizzas.length;
var table = document.getElementById('Tabla');

for (var i=0; i < len; i++) {
    var tr = document.createElement('tr');
    var s = arrayPizzas[i];

    var td = document.createElement('td');
    td.innerHTML = s.tipo;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = s.precio;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = s.key;
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "key";
    checkbox.value = s.key;
    checkbox.id = "id";
    tr.appendChild(checkbox);

    table.appendChild(tr);
}

}

function invoice() {
   
    var precio = 0;
    var ingrediente = document.getElementsByName("precio");
    var ingredienteSelect = [];
    var ingredienteDisplay = "";
    for (var i = 0; i < ingrediente.length; i++) {
        if (ingrediente[i].checked){
            ingredienteSelect.push(ingrediente[i].value);
        };
    }; console.log("ingredienteSelect="+ingredienteSelect);
    if (ingredienteSelect.length === 1) {
        ingredienteDisplay = ingredienteSelect[0];
    } else if (ingredienteSelect.length > 1) {
        for (i=0; i < ingredienteSelect.length; i++){
            ingredienteDisplay += ingredienteSelect[i];
            if (i < (ingrediente.length-1)) {
                ingredienteDisplay += ", ";
            };
        };
    };
    precio = ingredienteSelect.length; console.log("precio="+precio);
    if (ingredienteSelect.length === 0) {
        ingredienteDisplay = "Sin ingredientes";
    }
    
    //Calculando el precio total
    
    var precioTotal = precio; console.log("precioTotal="+precioTotal);
    
    $("#ingrediente").html(ingredienteDisplay);
    $("#precio").html("+"+precio+".00 €");~
    $("#precioTotal").html(precioTotal+".00 €"); 

}
