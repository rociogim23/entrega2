let API_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
let API_URL_JUGUETES ="https://japceibal.github.io/emercado-api/cats_products/102.json";
let cardsContainer = document.getElementById("container-cards");

// minCost y maxCost deben ser variables globales, ya que se modifican al
// hacer click en el boton de filtro, y debe quedar su valor guardado para 
// usarse en cualquier parte del código
let minCost = 0;
let maxCost = 9999999;

//---------------------------------------------------------------------------------

// Esta función devuelve un arreglo de productos obtenido mediante fetch()
async function fetchProducts() {
  try {
    let response = await fetch(API_URL);
    let data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error trayendo la data:", error);
  }
}
//---------------------------------------------------------------------------------

// Function setProdID(id) {
//    localStorage.setItem("prodID", id);
//    window.location = "products.html"
//}

//---------------------------------------------------------------------------------

// Función displayProducts modificada para aceptar el término de búsqueda
// santiago: Habían dos de estas funciones iguales, solo que una estaba modificada para
// admitir el parámetro "filterTerm", pero no es necesario tener dos.
// Al darle un valor a un atributo por defecto, en este caso ...filterTerm = "", este atributo se vuelve opcional
// y no es necesario tener otra función que no lo contenga
async function displayProducts(filterTerm = "") {
  let products = await fetchProducts();
  
  // Filtrar los productos si se proporciona un término de búsqueda
  if (filterTerm) {
    products = products.filter(product =>
      product.name.toLowerCase().includes(filterTerm.toLowerCase())
      );
    }
    
    // Mostrar los productos filtrados
    // La funcionalidad de filtrar los productos por rango de precio se encuentra acá, en el siguiente if(((minCost...
    // Lo unico que hay que hacer para filtrar los productos por rango de precio es acceder a las dos constantes
    // minCost y maxCost que creamos al inicio del código, y que cambian al presionar el botón de aplicar filtro.
    // Y luego a la hora de mostrar el producto, solo comparamos dentro del if si el producto está en el rango de precio.
    // Si se encuentra en el rango lo mostramos, de lo contrario simplemente se saltea.
    products.forEach(product => {
      if(((minCost == "") || (minCost != "" && parseInt(product.cost) >= minCost)) &&
      ((maxCost == "") || (maxCost != "" && parseInt(product.cost) <= maxCost)))
      {
        let card = document.createElement("div");
        card.classList.add("div-cards");
        card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div>
        <h2>${product.name} - ${product.currency} ${product.cost}</h2>
        <p>${product.description}</p>
        </div>
        <span class="price">${product.soldCount} vendidos</span>
        `;
        cardsContainer.appendChild(card); 
      }
    });
  }
  
  //---------------------------------------------------------------------------------
  
  // Llamo a la función para mostrar los productos cuando la página cargue
  displayProducts();

  //---------------------------------------------------------------------------------

  function getSearchTerm()
  {
    return document.getElementById("Busqueda").value;
  }
  
  //---------------------------------------------------------------------------------
  
  // Habían algunos .addEventListener dentro de funciones
  // Todas las asignaciones de eventos las dejé en esta parte para mejor organización.
  // OrdenarProductos toma como parametro la función que se usará para ordenarlos,
  // Esto permite que la función ordenarProductos pueda ordenar de cualquier forma que queramos con la función que le pasemos
  document.getElementById("flecha_Ascendente").addEventListener("click", function () {
    ordenarProductos((a, b) => {return (a.cost - b.cost)})});
    
    document.getElementById("flecha_Descendente").addEventListener("click", function () {
      ordenarProductos((a, b) => {return (b.cost - a.cost)})});
      
      document.getElementById("flecha_Relevancia").addEventListener("click",function(){
        ordenarProductos((a, b) => {return (b.soldCount - a.soldCount)})});
        
        // En este evento se establecen los rangos de precio en sus constantes, que l◘oego se usan en displayProducts();
        document.getElementById("rangeFilterCount").addEventListener("click", function () {
          // Primero se buscan los campos donde escribimos el precio minimo y el maximo
          const rangeFilterCountMin = document.getElementById("rangeFilterCountMin");
          const rangeFilterCountMax = document.getElementById("rangeFilterCountMax");
          
          // Luego a minCost y maxCost se le asigna el valor de esos inputs.
          minCost = rangeFilterCountMin.value;
          maxCost = rangeFilterCountMax.value;
          
          // Luego se limpia el contenedor y se muestran los resultados nuevamente, ya que acabamos de
          // cambiar los valores del filtro y hay que mostrarlos de nuevo pero filtrados.
          clearCardsContainer();
          displayProducts();
        });      
        
        // En este evento se limpian los campos de precio minimo y máximo
        // Al mismo tiempo se establecen minCost y maxCost en 0 y 9999999 respectivamente.
        // Esto es porque como limpiamos los filtros, queremos mostrar TODOS los productos, y
        // en este caso todos los productos se van a encontrar entre 0 y 9999999.
        document.getElementById("clearRangeFilter").addEventListener("click", function () {
          document.getElementById("rangeFilterCountMin").value = "";
          document.getElementById("rangeFilterCountMax").value = "";
          
          minCost = 0;
          maxCost = 9999999;
          
          clearCardsContainer();
          displayProducts();
        });
        
        document.getElementById("Busqueda").addEventListener("input", function(event) {
          clearCardsContainer(); // Limpia los productos actuales en la vista
          displayProducts(getSearchTerm()); // Muestra los productos filtrados por término de búsqueda
        });
        
        
        //---------------------------------------------------------------------------------
        
        // Como se explicó antes, OrdenarProductos toma como parametro la FUNCION que se usará para ordenarlos,
        async function ordenarProductos(ordFunction) {
          let products = await fetchProducts();
          
          /* Rodrigo: se usa el parseInt para bajar el numero de JSON a decimal*/
          products.sort(ordFunction);
          console.log(ordFunction);
          
          clearCardsContainer();
          
          // Muestra los productos ordenados
          // También se aplica el if para comparar si el producto se encuentra en el rango de precio.
          products.forEach((product) => {
            if(((minCost == "") || (minCost != "" && parseInt(product.cost) >= minCost)) &&
            ((maxCost == "") || (maxCost != "" && parseInt(product.cost) <= maxCost)))
            {
              let card = document.createElement("div");
              card.classList.add("div-cards");
              card.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <div>
              <h2>${product.name} - ${product.currency} ${product.cost}</h2>
              <p>${product.description}</p>
              </div>
              <span class="price">${product.soldCount} vendidos</span>
              `;
              cardsContainer.appendChild(card);
            }
          });
        }
        
        //---------------------------------------------------------------------------------
        
        // Función para limpiar los productos actuales en la vista, se utiliza junto con displayProducts()
        function clearCardsContainer() {
          cardsContainer.innerHTML = "";
        }