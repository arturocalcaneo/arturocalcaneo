$(document).ready(function(){
    const navbar= document.getElementById("gtco-header-navbar");
    if(navbar) {
        // El navbar ya está renderizado y disponible en el DOM
        const idioma = {
            "es": {
                "navbar": [
                    "Inicio",
                    "Perfil",
                    "Portafolio",
                    //"Precios",
                    "Contáctame"
                ]
            },
            'en': {
                "navbar": [
                    "Home",
                    "Profile",
                    "Portfolio",
                    //"Pricing",
                    "Contact"
                ]
            }
        };

        let lang = navigator.language || navigator.userLanguage || 'es';
        lang = lang.startsWith('es') ? 'es' : 'en';

        console.log(`Idioma del navegador detectado: ${lang}`);

        const navbarHeader= navbar.querySelector('#navbar-nav-header');
        if(navbarHeader) {
            const navLinks = navbarHeader.querySelectorAll('.nav-link');
            navLinks.forEach((link, index) => {
                link.textContent = idioma[lang].navbar[index] || link.textContent;
            });
        }
    }
});