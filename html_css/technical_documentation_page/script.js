const UL = document.querySelector("ul"); 

document.getElementById("toggle-container").addEventListener('click', event => {
    if(UL.classList == "visible") {
        UL.classList.remove("visible"); 
    } else {
        UL.className = "visible";
    }
});

const BODY = document.querySelector("body"); 
const SYMBOL = document.getElementById("symbol"); 

document.getElementById("darkmode-container").addEventListener('click', event2 => {
    if (BODY.classList == "darkmode") {
        BODY.classList.remove("darkmode"); 
        document.getElementById("circle").style.transform = "translateX(0px)"; 
        document.getElementById("slider").style.backgroundColor = "#ccc"; 
        SYMBOL.innerText = "☽"; 
        SYMBOL.classList.remove("night"); 
    } else {
        BODY.className = "darkmode";
        document.getElementById("circle").style.transform = "translateX(26px)";
        document.getElementById("slider").style.backgroundColor = "#5b10ad"; 
        SYMBOL.innerText = "☼"; 
        SYMBOL.className = "night"; 
    }
}); 