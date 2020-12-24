document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        
        document.getElementById(anchor.getAttribute('href').substr(1)).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    })
})