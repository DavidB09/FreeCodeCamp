const navigationMenu = document.querySelector("ul"); 

document.getElementById("toggle-container").addEventListener('click', () => {
    navigationMenu.classList.toggle('visible'); 
});

const documentBody = document.querySelector("body"); 
const colorModeSymbol = document.getElementById("symbol"); 

document.getElementById("darkmode-container").addEventListener('click', () => {
    if (documentBody.classList == "darkmode") {
        documentBody.classList.remove("darkmode"); 
        document.getElementById("circle").style.transform = "translateX(0px)"; 
        document.getElementById("slider").style.backgroundColor = "#ccc"; 
        colorModeSymbol.innerText = "☽"; 
        colorModeSymbol.classList.remove("night"); 
    } else {
        documentBody.className = "darkmode";
        document.getElementById("circle").style.transform = "translateX(26px)";
        document.getElementById("slider").style.backgroundColor = "#5b10ad"; 
        colorModeSymbol.innerText = "☼"; 
        colorModeSymbol.className = "night"; 
    }
}); 