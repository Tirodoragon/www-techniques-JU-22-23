function responsiveNav() {
    let element = document.getElementById("mynav");
    if (element.className === "mynav") {
        element.className += " responsive";
    } else {
        element.className = "mynav";
    }
}

function buttonLoad() {
    const button = document.querySelector("#click")
    button.addEventListener("click", feedBunny)
    button.addEventListener("mouseenter", onButton)
    button.addEventListener("mouseleave", offButon)
}

function feedBunny() {
    document.getElementById("interactive").src = "images/serce.png";

    let element = document.getElementById('alignment');
    element.remove();
}

function onButton() {
    document.getElementById("interactive").src = "images/zamknieta.png";
}

function offButon() {
    document.getElementById("interactive").src = "images/otwarta.png";
}

let slideIndex = 0;
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide")
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000);
}

function showQuestion() {
    let acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        })
    }
}