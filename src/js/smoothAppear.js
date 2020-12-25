window.onscroll = () => {
  for(let el of document.querySelectorAll(".smooth-appear")) {
    const rect = el.getBoundingClientRect();
    if(rect.top < document.documentElement.clientHeight) {
      el.classList.remove("invisible");
      el.classList.remove("smooth-appear");
    }

    console.log(window.pageYOffset);
  }
}