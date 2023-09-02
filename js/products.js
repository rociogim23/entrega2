let API_URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem(
  "catID"
)}.json`;
let API_URL_JUGUETES =
  "https://japceibal.github.io/emercado-api/cats_products/102.json";
let cardsContainer = document.getElementById("container-cards");

async function fetchProducts() {
  try {
    let response = await fetch(API_URL);
    let data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error trayendo la data:", error);
  }
}


async function displayProducts() {
  let products = await fetchProducts();

  products.forEach((product) => {
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
  });
}
// Llamo a la func para mostrar los productos cuando la página cargue
displayProducts();

//ordena pero alfabeticamente y no por precio (porque el precio esta dentro del h2)(rocio)
document.getElementById("flecha_Ascendente").addEventListener("click", function () {
    ordenarProductos('ascendente');
  });

document.getElementById("flecha_Descendente").addEventListener("click", function () {
    ordenarProductos('descendente');
  });

document.getElementById("flecha_Relevancia").addEventListener("click", function () {
  ordenarProductos('relevante');
});

async function ordenarProductos(x) {
  let products = await fetchProducts();

  /* Rodrigo: se usa el parseInt para bajar el numero de JSON a decimal*/
  products.sort(function (a, b) {
    let priceA = parseInt(a.cost);
    let priceB = parseInt(b.cost);
    let countA = parseInt(a.soldCount);
    let countB = parseInt(b.soldCount);

    if (x == 'ascendente') { // ascendente
      return priceA - priceB;
    } else if (x == 'descendente'){ // descendente
        return priceB - priceA;
    }else if (x == 'relevante'){ // relevante
      return  countB - countA; 
    }
  });

  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }

  
  // Muestra los productos ordenados
  products.forEach((product) => {
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
  });
}

//Funciona el boton de limpiar en products.html(rocio)
document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;
  });

//filtro

// function showCategoriesList() {
//   let minimo = document.getElementById("rangeFilterCountMin").value;
//   let maximo = document.getElementById("rangeFilterCountMax").value;

//   products.forEach((product) =>  {
   
//     if (
//       (minimo == undefined ||
//         (minimo != undefined && parseInt(product.cost) >= minimo)) &&
//       (maximo == undefined ||
//         (maximo != undefined && parseInt(product.cost) <= maximo))
//     ) {
     
  
//     let card = document.createElement("div");
  
//     card.classList.add("div-cards");
//     card.innerHTML = `
//     <img src="${product.image}" alt="${product.name}">
//     <div>
//         <h2>${product.name} - ${product.currency} ${product.cost}</h2>
//         <p>${product.description}</p>
//     </div>
//     <span class="price">${product.soldCount} vendidos</span>
//   `;
  
//     cardsContainer.appendChild(card);
//     }
//   }
   
// )};
  


//boton filtro

// let boton_filtrar = document.getElementById("rangeFilterCount");

// boton_filtrar.addEventListener("click", function () {
//   showCategoriesList();
// });

document.getElementById("Busqueda").addEventListener("input", function(event) {
  const searchTerm = event.target.value;
  clearCardsContainer(); // Limpia los productos actuales en la vista
  displayProducts(searchTerm); // Muestra los productos filtrados por término de búsqueda
});
// Función para limpiar los productos actuales en la vista
function clearCardsContainer() {
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
}

// Función displayProducts modificada para aceptar el término de búsqueda
async function displayProducts(filterTerm = "") {
  let products = await fetchProducts();

  // Filtrar los productos si se proporciona un término de búsqueda
  if (filterTerm) {
    products = products.filter(product =>
      product.name.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }

  // Mostrar los productos filtrados
  products.forEach(product => {
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
  });
};