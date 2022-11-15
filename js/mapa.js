

let listaRestaurantes = []; //variable que contendra los restaurantes
let infoWindow = null; //ventana de información que se abrirá al clickar sobre un restaurante

const array = [];



function initMap() {
  import("./util.js").then((mod) => {
    return mod.enviarRequest("GET", "./server/restaurantes.json");
  })
 .then((restaurantes)=> {
  listaRestaurantes = restaurantes;
  navigator.geolocation.getCurrentPosition(myMapEx);
 
 });
}

function myMapEx(myPosition){
  const coords = myPosition.coords;


  const myMapProperties = {
      center: new google.maps.LatLng(coords.latitude, coords.longitude),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
  
  const myMap = new google.maps.Map(
    document.getElementById('mapa'), 
    myMapProperties
  );

  // iteramos sobre el array de restaurantes para crear marcadores
  for (const restaurante of listaRestaurantes) {
    const lat = restaurante.lat;
    const long = restaurante.long;
    const nombre = restaurante.nombre;
    

    const markerOpt = {
      position: new google.maps.LatLng(lat, long),
      title: nombre,
     
    };
    
    let marker = new google.maps.Marker(markerOpt);
    marker.setMap(myMap);
    marker.addListener("click", restauranteClickHandler);
    array.push(marker);
   
}

}


/**
 * Funcion que muestra un restaurante en el mapa 
 * cuando seleccionamos de la lista
 */
 function selectRestClickHandler(rest) {
  console.log("ESTOY EN SELECTRESTCLICK" );

  let id;
  let la;
  let lo;
  let nom;
  let opciones;
  
  for (const restF of listaRestaurantes) {

    if (restF.id == rest.value){
      id = restF.id;
      la = restF.lat;
      lo = restF.long;
      nom = restF.nombre;
       opciones = {
        position: new google.maps.LatLng(la, lo),
        title: nom,
      }
    }
  };



  const marker = new google.maps.Marker(opciones);

    array.forEach((marcador) =>{
      let nomAn = marcador.title;
      let nomUS = marker.title;

      if ( nomAn === nomUS ){
  
      
      if (!infoWindow) {
        // si no existe ya, se crea la infoWindow
        infoWindow = new google.maps.InfoWindow();
        infoWindow.open(marcador.map, marker);
      }
      // modificamos la infoWindow con los datos del marcador que ha desatado el evento
      infoWindow.setContent(marcador.title);
      infoWindow.setAnchor(marcador);


      }

    });
    
}



/**
 * Funcion que muestra un restaurante en el mapa y lo selecciona
 * en el menu de seleccion
 */
 function restauranteClickHandler() {
  const marker = this; // this es el marcador que ha desatado el evento
  if (!infoWindow) {
    // si no existe ya, se crea la infoWindow
    infoWindow = new google.maps.InfoWindow();
    infoWindow.open(marker.map, marker);
  }
  // modificamos la infoWindow con los datos del marcador que ha desatado el evento
  infoWindow.setContent(marker.title);
  infoWindow.setAnchor(marker);

  // llamamos a la funcion auxiliar de seleccion
  seleccionarRestaurante(marker.title);
}


/**
 * funcion que marca un restaurante como seleccionado
 * en el menu de seleccion
 * @param {} nombre nombre del restaurante
 */
 const seleccionarRestaurante = (nombre) => {

  const restaurante = listaRestaurantes.filter(
    (rest) => rest.nombre === nombre
  )[0]; //filtramos por nombre y cogemos el primer elemento del array filtrado
  //buscamos el restaurante en documento y lo seleccionamos
  const nodoRestaurante = document
    .getElementById("restaurantes")
    .querySelector(`option[value=${restaurante.id}]`);
  nodoRestaurante.selected = true;
  import("./validacion.js").then((mod) => mod.validarRestaurante());
}


// console.log("Esta cogiendo el restaurante?", nodoRestaurante);


/**
 * Funcion que lanza una peticion al servidor y devuelve la respuesta
 * @param {*} method metodo http usado
 * @param {*} path ruta al archivo
 */
 function enviarRequest(method, path) {
  // envolvemos la funcion en una Promise para poder usarla en funciones
  // en combinacion con then() o await
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, path, true);
    xhr.onload = function () {
      if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
      else reject(xhr.response);
    };

    xhr.send();
  });
  return promise;
}
