$(document).ready(function(){
    // Identificar cuando la barra de navegación está renderizada
    const navbar = document.getElementById("gtco-header-navbar");
    if(navbar){
        // Obtener los elementos hijos de la barra de navegación
        const childContainer = navbar.querySelector('.container');
        const navbarIcon = childContainer.querySelector('.navbar-brand');
        const navbarNavHeader = childContainer.querySelector('#navbar-nav-header');

        // Funcion para alternar colores de la barra de navegación.
        const navbarColors = function(color) {
            // Cambiar el color del icono de la barra de navegación
            navbarIcon.style.color = color;

            // Cambiar el color de los enlaces de navegación
            const navLinks = navbarNavHeader.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.style.color = color;
            });
        };

        // CASO 1: Estático (al cargar la página).

            // Si la barra de navegación no tiene la clase 'navbar-transparent', poner colores en blanco.
            if(navbar.classList.contains('navbar-transparent') == true)
                navbarColors('black');
            else
                navbarColors('white');

            // Si el ancho de la ventana es menor a 992px, poner colores en
            if(window.innerWidth < 992)
                navbarColors('black');
            else
                navbarColors('white');

            // Si el ancho de la ventana está entre 768px y 992px, obtener los elementos de la sección del contador.
            const counterSection = document.querySelector('#gtco-counter');
            const counterItems = counterSection.querySelectorAll('.counter-item');
            const itemMedio = counterItems[1];

            if(window.innerWidth >= 768 && window.innerWidth < 992) {
                if(counterSection) {
                    const textoItemMedio = itemMedio.querySelector('span');
                    textoItemMedio.innerHTML = 'Total';
                }
            }else{
                if(counterSection) {
                    const textoItemMedio = itemMedio.querySelector('span');
                    textoItemMedio.innerHTML = 'Completo';
                }
            }

            // Al recargar la página, al hacer scroll verficiar si el texto del navbar ya está en color negro y si el body contiene la clase not-on-top.
            var windowScrollContinuar= true;
            $(window).on('scroll', function(){
                if(windowScrollContinuar){
                    const body= document.getElementsByTagName('body')[0];
                    const navbarBrand= document.getElementsByClassName('navbar-brand')[0];
                    const navbarNav= document.getElementsByClassName('navbar-nav')[0];

                    if(body.classList.contains('not-on-top')){
                        if(navbarBrand.style.color == 'white'){
                            document.getElementsByClassName('navbar-brand')[0].style.color= 'black';
                        }

                        for(let li of navbarNav.querySelectorAll('.nav-item')){
                            if (li.querySelector('a').style.color === 'white') {
                                li.querySelector('a').style.color = 'black';
                            }
                        }

                        windowScrollContinuar= false; // Detener el scroll para evitar reasignación del mismo color.
                    }
                }
            });

        // CASO 2: Por cambios en las clases (navbar).

            // Observador para detectar cambios en las clases del navbar
            const observer = new MutationObserver(function(mutationsList) {
                mutationsList.forEach(function(mutation) {
                    if (mutation.type === "attributes" && mutation.attributeName === "class") {
                        // Si la barra de navegación adquiere la clase 'navbar-transparent', cambiar colores según el ancho de la ventana.
                        if(mutation.target.classList.contains('navbar-transparent')){
                            if(window.innerWidth < 992)
                                navbarColors('black');
                            else
                                navbarColors('white');
                        }else{
                            navbarColors('black');
                        }
                    }
                });
            });

            observer.observe(navbar, { attributes: true });
        
        // CASO 3: Al redimensionarse la ventana.

            // Detectar el cambio de tamaño de la ventana
            $(window).resize(function(){
                if(document.getElementsByTagName('body')[0].classList.contains('not-on-top')){
                    navbarColors('black');
                }

                // Actualizar el texto del elemento medio en la sección del "contador"
                if(window.innerWidth >= 768 && window.innerWidth < 992) {
                    if(counterSection) {
                        const textoItemMedio = itemMedio.querySelector('span');
                        textoItemMedio.innerHTML = 'Total';
                    }
                }else{
                    if(counterSection) {
                        const textoItemMedio = itemMedio.querySelector('span');
                        textoItemMedio.innerHTML = 'Completo';
                    }
                }
            });
    }
});