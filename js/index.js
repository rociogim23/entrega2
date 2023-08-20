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