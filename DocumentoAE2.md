# AE-2. AJAX
*Andrea Adelaila*

*David López*

*Ixchel López*

## Estructura general
Primero de todo, hemos tenido en cuenta la nota que nos diste en la Actividad 1 y hemos intentado simplificar el nombre de las variables. 
También hemos echado mano del ejercicio que compartiste a la hora de la validación y algunos mensajes de texto de error tienen un time-out para probar dicha funcionalidad y también hemos simplificado la validación de los campos `nombre` y `apellidos` como nos indicaste.


Para maximizar la compatibilidad con el código de la Actividad 1, hemos utilizado varios archivos, todos incluidos en la carpeta "js" del proyecto.
- **vlaidacion.js**: archivo que contiene el código de validación del formulario de la Actividad 1, adaptado al uso de cargarDatos. Hemos realizo diferentes cambios pero no los comentaremos aquí por simplicidad.
- **cargarDatos.js**: archivo que contiene el código necesario para los requerimientos 1 y 2 de esta actividad.
- **util.js**: archivo con funciones auxiliares utilizadas por distintos scripts.
- **mapa.js** - **archivo no calificable**: hemos querido probar la geolocalización del respositorio WSJavaScript y probar como se coloca un mapa JS de google.


Para poder cargar los datos dinámicamente en el html, hemos tenido que importar el archivo *cargarDatos.js*:

![pantallazo-cargarDatos](images\captura1.png)



También hay que asegurarse de que importamos la función correcta para calcular el precio en el archivo *validacion.js*:

![pantallazo-calcularPrecio](images\captura2.png)

## Simulación del servidor
La simulación del servidor se ha hecho con archivos en formato .json almacenados en la carpeta “server” de nuestro proyecto. Las requests de esta actividad apuntan a los recursos en esta carpeta:
- **ingredientes.json**: contiene un array de objetos, cada uno de los cuales representa un ingrediente con una propiedad “nombre” y otra propiedad “precio”.

- **pizzas.json**: contiene un objeto con dos propiedades “tamanios” y “masas” (ya que nuestro formulario incluye opciones para los distintos tipos de masa). Cada propiedad contiene un array con las opciones. El array de tamaños lo forman objetos con las propiedades “nombre” y “precio”.

![pantallazo-pizzas.json](images\captura3.png)


- **restaurantes.json**: contiene un array de objetos, cada uno de los cuales representa un restaurante con cuatro propiedades, dos sus coordenadas ("lat" y "long"), una su "nombre" y otra propiedad para su "ID". A través de este array obtendremos los restaurantes para el select y también las coordenadas para el mapa.  

----------  






## **Requerimiento 1**

Estas son las partes del formulario que se cargan dinámicamente:

![pantallazo-cargaHTMLdinámica](images\captura4.png)

*Estos son los datos del formulario de la actividad 1 cargados dinámicamente*       



También, aunque no está dentro del requerimiento de la actividad, estamos cargando de forma dinámica el SELECT con los restaurantes y el mapa (Lo explicaremos más al final del documento en Anexo 1).  


![pantallazo-cargaHTMLdinámica](images\captura5.png)

*El select y el mapa se cargan de forma dinámica también*  

----------  



### **Obtencion de informacion del servidor**  


Se han definido a nivel global las variables `infoPizza`, `ingredientes` y `restaurantes`, para evitar múltiples accesos al servidor (ya que el precio también se muestra en el formulario, calculándose cada vez que el usuario modifica la selección de un campo relevante).  

El archivo obtiene los datos del servidor y carga los elementos HTML mediante la función *cargarDatos()* cuando se ha cargado la página:
La función *cargarDatos()* es la encargada de obtener la información del servidor y de llamar a las funciones que rellenarán el html con dicha información. La llamada a *agregarEventListeners()* ocurre dentro de esta función, ya que si no se perderían cada vez que el usuario pulse el botón de “Refrescar”.  

Definimos las variables donde recogeremos la informacion relevante a nivel global para evitar sobrecarga (ya que el calculo de precio se realiza cada vez que el usuario modifica la seleccion). La recogida de informacion se ejecutara cada vez que se ejecute el script (en este caso, cada vez que se recarga la pagina o se pulsa el boton de Refrescar).  


![pantallazo-cargaHTMLdinámica](images\captura6.png)
----------
***Nota:*** *la función se precede con el modificador “async”. Gracias a esto podemos usar la palabra clave “await”, que indica que hay que esperar a la resolución del método antes de continuar a la siguiente línea de código.*  


La función *cargarDatos()* hace uso de una función auxiliar *enviarRequest()* , incluida en el archivo util.js:  


![pantallazo-cargaHTMLdinámica](images\captura7.png)  

La función *agregarEventListers()* en *cargarDatos()* se encarga de añadir los event listeners a todos los elementos de la página:  

![pantallazo-cargaHTMLdinámica](images\captura8.png)
![pantallazo-cargaHTMLdinámica](images\captura9.png)
![pantallazo-cargaHTMLdinámica](images\captura10.png)


### **Carga de la lista de ingredientes**  


Esta función itera sobre la lista de ingredientes del servidor, realizando las siguientes acciones:
1.	Limpieza del nodo de ingredientes (eliminación de la lista existente).

2.	Creación de un nodo wrapper para mantener la estructura compatible con la hoja de estilos original. Este nodo se añade al nodo de ingredientes del archivo index.html.
3.	Generación de un id utilizando el nombre del ingrediente.
4.	Creación de una checkbox con dicho id y el nombre del ingrediente como “name”.
5.	Creación de una label con el nombre del ingrediente.
6.	Añadido de la checkbox y label al nodo wrapper creado en el punto 1.  


![pantallazo-cargaHTMLdinámica](images\captura11.png)  


La función hace uso de la función auxiliar *limpiarNodo()* incluida en el archivo util.js:

![pantallazo-cargaHTMLdinámica](images\captura12.png)  

### **Carga de distintos tipos de masa**
Esta función recorre la lista de masas del servidor realizando los siguientes pasos, de forma muy similar a la lista de ingredientes:
1.	Limpieza del nodo de masas

2.	Creamos un nodo wrapper que mantendrá la estructura compatible con la hoja de estilos original. Este nodo se añade al nodo de masas del archivo pizzas.html.

3.	Generamos un id utilizando el nombre del tamaño encontrado en pizzas.json.
4.	Creamos los radiobuttons con dicho id, y como valor, accedemos al nombre de cada tamaño a través de masas.
5.	Se crea una label con el nombre de cadatipo de masa.
6.	Colocamos la label y el radiobutton al nodo wrapper ya creado.

![pantallazo-cargaHTMLdinámica](images\captura13.png)  

### **Carga de distintos tamaños**

Esta función recorre la lista de tamaños del servidor realizando los siguientes pasos, de forma muy similar a las otras:
1.	Limpieza del nodo de tamaños

2.	Creamos un nodo wrapper que mantendrá la estructura compatible con la hoja de estilos original. Este nodo se añade al nodo de ingredientes del archivo index.html.
3.	Generamos un id utilizando el nombre del tamaño encontrado en pizzas.json.
4.	Creamos los radiobuttons con dicho id, y como valor, accedemos al nombre de cada tamaño a través de tamanios.nombre.
5.	Se crea una label con el nombre de cada tamaño.
6.	Colocamos la label y el radiobutton al nodo wrapper ya creado.  

![pantallazo-cargaHTMLdinámica](images\captura14.png) 


### **Carga de restaurantes**  

Esta función recorre la lista de restaurantes del servidor realizando los siguientes pasos, de forma muy similar a las anteriores:
1.	Limpieza del nodo de restaurantes.

2.	Creamos un nodo SELECT que mantendrá la estructura compatible con la hoja de estilos original. Este nodo se añade al nodo de restaurantes del archivo index.html.

3. Creamos una opción defaut que será única para cada vez que se carguen los restaurantes.	

4.	Generamos el atributo "value" utilizando el id del restaurante encontrado en restaurantes.json.

5.	Creamos las opciones con dicho "value"  y se crea el textContent a partir del nombre de cada restaurante en el json.
6.  Colocamos cada option al select ya creado. 

![pantallazo-cargaHTMLdinámica](images\captura15.png) 

### **Botón de refrescar**  

Se ha creado un botón adicional en el archivo index.html con un event listener que llama a la funcion *cargarDatos()* :  

![pantallazo-cargaHTMLdinámica](images\captura16.png)
![pantallazo-cargaHTMLdinámica](images\captura17.png)



## **Requerimiento 2**

Al enviar el formulario, aparecerá un popup pidiendo al usuario confirmación y mostrándole el precio (el formulario sólo se envía si el usuario confirma) :

![pantallazo-cargaHTMLdinámica](images\captura18.png)

Para evaluar el Requerimiento 2 hay que importar el script del archivo *cargarDatos.js*, y la funcion `calcularPrecio()` como hemos mostrado antes.  

Por simplicidad en la integración con el código de la Actividad 1 a la hora de corrección, se ha añadido la función `calcularPrecio()` al archivo *cargarDatos.js*. Lo más correcto sería añadirlo en otro archivo, pero nos ha parecido más sencillo incluirlas en los archivos de carga de datos. 


La función *calcularPrecio()* utiliza las variables globales `infoPizza` e `ingredientes`, donde se han almacenado los precios de cada tamaño e ingrediente, para aplicarlos dependiendo de la selección del usuario:

![pantallazo-cargaHTMLdinámica](images\captura19.png)

La función *calcularPrecio()* es utilizada por el script de validación desarrollado en la Actividad 1:

![pantallazo-cargaHTMLdinámica](images\captura20.png)

### **Mostrando del precio**

En la aplicación mostramos el resultado de esta función a través de dos modos:
1. En la caja que se hace visible al seleccionar un elemento asociado a la función (un ingrediente o un tamaño).      
    - Generamos la caja de forma dinámica en *cargarDatos()* a través del llamamiento a la función *cargarInfo*.

      1. Limpiamos el div "info" creado  en el HTML.
      2. Creamos un nodo precioNode que contendrá un elemento p.
      3. Le signamos un id "info-precio" y una clase "btn" como atributos.  

    ![pantallazo-cargaHTMLdinámica](images\captura23.png)  

    - En la aplicación web la información de precio se muestra así:  

    ![pantallazo-cargaHTMLdinámica](images\captura21.png)  

    *Antes de seleccionar un elemento el párrafo no es visible*  


    ![pantallazo-cargaHTMLdinámica](images\captura22.png)  

    *Al seleccionar un elemento el párrafo es visible y muestra los cambios en el precio final*  
    

    
 2. También podremos ver el resultado de la función cuando enviemos el formulario debidamente cumplimentado:  

    ![pantallazo-cargaHTMLdinámica](images\captura25.png) 

    ![pantallazo-cargaHTMLdinámica](images\captura24.png)

Por último, la función cargarInfo() también será llamada por el botón "Borrar formulario":

  ![pantallazo-cargaHTMLdinámica](images\captura26.png)

Hacemos esto para limpiar el nodo del botón ya que no se hace automáticamente como el resto del formulario con el botón "reset.

## ANEXO
### **Mapa.js**



