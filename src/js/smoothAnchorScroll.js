document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();

        console.log("new scroll");
        const el = document.getElementById(anchor.getAttribute('href').substr(1));
        const header = document.querySelector("header");

        document.getElementById(anchor.getAttribute('href').substr(1)).scrollIntoView({
          behavior: 'smooth',
          top: el.getBoundingClientRect().top + window.pageYOffset - header.clientHeight
        });
    })
})