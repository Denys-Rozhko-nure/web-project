import "./style.less";
import "./js/smoothAnchorScroll";
import "./js/smoothAppear";
import "./js/modalWindow";
import slider from "./js/slider";
import animate from "./js/animate";

slider.init();

localStorage.setItem("authorised", false);

setupAuthorised();

document.getElementById("font-size").addEventListener("change", function(options) {
    document.documentElement.style.fontSize = options.target.value + "px";
}); 

document.getElementById("settings-image").addEventListener("click", () => { 
    const settings = document.querySelector(".settings");
    if(window.getComputedStyle(settings).height == "0px") {
        
        settings.style.height = "auto";
        const clientHeight = settings.clientHeight;
        settings.style.height = "0px";
        const pageYOffset1 = window.pageYOffset; 

        animate({
            timing: t => t,
            duration: 1000, 
            draw(progress) {
                settings.style.height = clientHeight * progress + "px";
                window.scrollTo(0, pageYOffset1 * (1 - progress));
            }
        });
    } else {
        const clientHeight = settings.clientHeight;
        const startYOffset = window.pageYOffset;
        animate({
            timing: t => t,
            duration: 1000,
            draw(progress) {
                settings.style.height = clientHeight *(1 - progress) + "px";
                window.scrollTo(0, startYOffset - clientHeight * progress);
            }
        });
    }
})

function setupAuthorised() {
    console.log(localStorage.getItem("authorised"));
     
    if(localStorage.getItem("authorised") == "true") {
        document.querySelector(".settings-disabled").style.display = "none";   
        document.querySelector(".settings-enabled").style.display = "flex"; 
    } else {
        document.querySelector(".settings-enabled").style.display = "none";      
        document.querySelector(".settings-disabled").style.display = "block"; 
    }

    const settings = document.querySelector(".settings");
    settings.style.height = "auto";

}

const authoriseForm = document.getElementById("authorise-form");
authoriseForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(authoriseForm);

    const isAuthorisedSucceed = formData.get("name").trim() == "Admin" &&
                                formData.get("password").trim() == "12345";

    localStorage.setItem("authorised", isAuthorisedSucceed);

    if(!isAuthorisedSucceed) {
        document.getElementById("err-text").textContent = "Ошибка! Неправильный логин или пароль."
    }

    setupAuthorised();
});

document.getElementById("menu-button").addEventListener("click", () => {
    const nav = document.querySelector("nav");

    if(window.getComputedStyle(nav).height == "0px") {
        nav.style.height = "auto";
        const clientHeight = nav.clientHeight;
        nav.style.height = "0px";

        animate({
            timing: t => t * t,
            duration: 200, 
            draw(progress) {
                nav.style.height = clientHeight * progress + "px";
            }
        });
    } else {
        const clientHeight = nav.clientHeight;
        const startYOffset = window.pageYOffset;
        animate({
            timing: t => t * t,
            duration: 200,
            draw(progress) {
                nav.style.height = clientHeight *(1 - progress) + "px";
                window.scrollTo(0, startYOffset - clientHeight * progress);
            }
        });
    }
})