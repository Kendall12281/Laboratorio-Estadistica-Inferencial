 //Almacenar datos del JSON
 var datosVentas;
 var datosTotales;
 var media;
 var varianzaMuestral;
 var n;

 // Obtener datos de JSON
 function fetchData() {
   fetch("http://localhost:5555/Ventas")
     .then((response) => {
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       return response.json();
     })
     .then((data) => {
       const ventas = data.map((objeto) => objeto["Ventas (en $)"]);
       useData(ventas, data);
     })
     .catch((error) => {
       console.error("Hubo un problema obteniendo los recursos:", error);
     });
 }

 function useData(jsonData, totales) {
   datosVentas = jsonData;
   datosTotales = totales;

   varianzaMuestral = calcularVarianzaMuestral(jsonData)
 }

 function calcularVarianzaMuestral(muestra) {
   console.log("muestra", muestra);
   // Calcular la media de la muestra
   media = muestra.reduce((acum, valor) => acum + valor, 0) / muestra.length;
   n = muestra.length;

   // Calcular la varianza muestral
   const varianza =
     muestra.reduce((acum, valor) => acum + Math.pow(valor - media, 2), 0) /
     (muestra.length - 1);



   return Math.sqrt(varianza);
 }

 //cargar datos del JSON
 fetchData();

 function obtenerEjercicio1() {
   CargarTabla();

   //mostrar media y varianza

   var mediaElement = document.getElementById("media");
   var varianzaElement = document.getElementById("varianza");

   mediaElement.textContent += media;
   varianzaElement.textContent += varianzaMuestral;

   //hacer los calculos
   var calculoElement = document.getElementById("calculo1");
   //   var calculoString = "${media}-2.33*${varianza}/";
   var calculoString =
     "\\[ " +
     media +
     " - 2.33 \\pm \\frac{" +
     varianzaMuestral +
     "}{\\sqrt{" +
     n +
     "}} \\]";
   var resultado1 = media - (2.33 * varianzaMuestral) / Math.sqrt(n);
   var resultado2 = media + (2.33 * varianzaMuestral) / Math.sqrt(n);

   calculoElement.innerHTML += calculoString;
   calculoElement.innerHTML += resultado1 + "  <µ<  " + resultado2;

   //renderizar la formula en html
   MathJax.typesetPromise()
     .then(() => {
       console.log("Fórmula renderizada con MathJax.");
     })
     .catch((err) => console.log("Error al renderizar con MathJax:", err));

   console.log("Varianza muestral:", varianzaMuestral);

   var ejercicio1Element = document.getElementById(
     "accordionPanelsStayOpenExample"
   );
   ejercicio1Element.classList.remove("d-none");

   var ejercicio1buttonElement = document.getElementById("buttonEjercicio1");
   ejercicio1buttonElement.classList.add("d-none");
 }

 function obtenerEjercicio2() {
   //hacer los calculos
   var calculo2Element = document.getElementById("calculo2");
   
   var calculoString =
   "\\[\\frac{" +
   media +
   "- 17500000}{\\frac{" +
   varianzaMuestral +
   "}{\\sqrt{" +
   n +
   "}}}\\]";
   
   calculo2Element.innerHTML += calculoString;
   
   
   
   var ejercicio2buttonElement = document.getElementById("buttonEjercicio2");
   ejercicio2buttonElement.classList.add("d-none");
   
   let numerator = 17796672 - 17500000;
   let denominator = 13324124.96 / Math.sqrt(180);
   
   let result = numerator / denominator;
   
   calculo2Element.innerHTML += "Resultado: "+result;
   
   //renderizar la formula en html
   MathJax.typesetPromise()
   .then(() => {
       console.log("Fórmula renderizada con MathJax.");
     })
     .catch((err) => console.log("Error al renderizar con MathJax:", err));
     
     var esAceptada = document.getElementById("esAceptada");
     var resultado = "Aceptada"
     
     if(result <= 1.64 && result >= -1.64 ){
     }else{
         resultado = "Rechazada"
     }
     
     esAceptada.innerHTML += "Hipótesis es: "+resultado;

     var ejercicio1button1Element = document.getElementById("accordionPanelsStayOpenExample2");
   ejercicio1button1Element.classList.remove("d-none");



 }

 function CargarTabla() {
   var tableBody = document.getElementById("tableBody");
   for (var i = 0; i < 10; i++) {
     if (datosTotales[i]) {
       var row = `<tr>
                     <td>${datosTotales[i].Año}</td>
                     <td>${datosTotales[i].Mes}</td>
                     <td>${datosTotales[i].Productos}</td>
                     <td>${datosTotales[i].Región}</td>
                     <td>${datosTotales[i].Unidades}</td>
                     <td>${datosTotales[i].Vendedor}</td>
                     <td>$${datosTotales[i]["Ventas (en $)"]}</td>
                      
                     </tr>`;
       tableBody.innerHTML += row;
     }
   }
 }