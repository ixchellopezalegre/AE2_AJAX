let listaRestaurantes = []; //variable que contendra los restaurantes
let infoWindow = null; //ventana de información que se abrirá al clickear sobre un restaurante

/**
 * Funcion que carga la lista de restaurantes y
 * desata la carga del mapa
 */
function initMap() {
    console.log("HE entrado en initMap");
  import("./util.js") //importamos el módulo de utilidades
    .then((mod) => {
      return mod.enviarRequest("GET", "./server/restaurantes.json"); //obtenemos la lista de restaurantes
    })
    .then((restaurantes) => {
      listaRestaurantes = restaurantes;
      navigator.geolocation.getCurrentPosition(myMapExec); //cargamos el mapa centrado en la posicion del usuario
    });

    
			//Si no existe, el navegador no soporta geolocalización
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(myMapExec,
					gestiona_errores);
			} else {
				alert('Tu navegador no soporta la API de geolocalizacion');
			
		}
}

/**
 * Funcion que carga el mapa con los restaurantes,
 * centrado en la posicion dada
 * @param {} myPosition
 */
 function myMapExec(myPosition) {
    const coords = myPosition.coords;
    console.log("HE entrado en myMapExec");
    console.log("Mi localizacion es" , coords);
    const myMapProperties = {
      center: new google.maps.LatLng(coords.latitude, coords.longitude),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
  
    const myMap = new google.maps.Map(
      document.getElementById("googleMap"),
      myMapProperties
    );
      
    console.log("Mi mapa es" , myMap);
    
    // iteramos sobre el array de restaurantes para crear marcadores
    for (const restaurante of listaRestaurantes) {
      const lat = restaurante.lat;
      const long = restaurante.long;
      const nombre = restaurante.nombre;
      console.log("El restaurante que recorremos es" , nombre);

      const markerOpt = {
        position: new google.maps.LatLng(lat, long),
        title: nombre,
      };
      let marker = new google.maps.Marker(markerOpt);
      marker.setMap(myMap);
      marker.addListener("click", restauranteClickHandler);      
    } 
  }
  
/**
 * Funcion que muestra un restaurante en el mapa y lo selecciona
 * en el menu de seleccion
 */
function restauranteClickHandler() {

    // this es el marcador que ha desatado el evento
    const marker = this;  if (!infoWindow) {
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
      .getElementById("restaurante")
      .querySelector(`option[value=${restaurante.id}]`);
    nodoRestaurante.selected = true;
    import("./validacion.js").then((mod) => mod.validarRestaurante());

  };

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

  function gestiona_errores(err) {
    if (err.code == 0) {
      alert("error desconocido");
    }
    if (err.code == 1) {
      alert("El usuario no ha compartido su posicion");
    }
    if (err.code == 2) {
      alert("no se puede obtener la posicion actual");
    }
    if (err.code == 3) {
      alert("timeout recibiendo la posicion");
    }
  }
