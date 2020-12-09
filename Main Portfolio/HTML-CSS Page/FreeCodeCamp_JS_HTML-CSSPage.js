function toggleFunction() {
    document.getElementById("dropdown-content-div").classList.toggle("show");
    
    if (document.getElementById("arrow").classList.contains("arrow-right")) {
        document.getElementById("arrow").classList.replace("arrow-right", "arrow-down"); 
    } else {
        document.getElementById("arrow").classList.replace("arrow-down", "arrow-right"); 
    }
}

function toggleFunction2() {
    document.getElementById("dropdown-content-div").classList.toggle("show");
    
    if (document.getElementById("arrow").classList.contains("arrow-right")) {
        document.getElementById("arrow").classList.replace("arrow-right", "arrow-down"); 
    } else {
        document.getElementById("arrow").classList.replace("arrow-down", "arrow-right"); 
    }
}

window.onclick = function(event) {
    if (!event.target.matches("#dropdown-button") && !event.target.matches("#arrow")) {
        document.getElementById("dropdown-content-div").classList.remove("show"); 
        document.getElementById("arrow").classList.replace("arrow-down", "arrow-right"); 
    }
}