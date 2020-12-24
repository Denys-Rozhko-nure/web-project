import "./style.less";
import "./js/smoothAnchorScroll";
import slider from "./js/slider";

// slider.init();

document.getElementById("font-size").addEventListener("change", function(options) {
    document.documentElement.style.fontSize = options.target.value + "px";
    console.log(document.documentElement.style.fontSize);
    console.log(options.target.value);
}); 

