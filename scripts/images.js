const superimage = document.getElementById("superimage")
const overlay = document.getElementById("overlay")

function image(bild){
    const source = bild.getAttribute("src")
    
    superimage.src = source
    
    overlay.style.display = "flex"
    superimage.style.opacity = 1
};

function end(e){
    if (e.target !== superimage) {
        superimage.style.opacity = 0;
        overlay.style.display = "none";
    }
};