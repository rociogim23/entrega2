document.addEventListener("DOMContentLoaded", function(){
    
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
});

function isLoggedIn() {
    let dato = localStorage.getItem("email");
    if (dato){
        return true;
    }else{
        return false;
    }
}

window.addEventListener('load', function() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
});

//Entregable 2

let email = localStorage.getItem("email"); // <- email = "emilianopintos18@gmail.com"

let li_nav = document.getElementById("usuario");


li_nav.innerHTML = `<span class="nav-link">${email}</span>`;