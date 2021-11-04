/* ------------------------------------------------------------------------------------------------
MENU BAR CHANGE
-------------------------------------------------------------------------------------------------*/
const topLogo = document.getElementById('top-logo');
const topMenuBar = document.getElementById('top-menu-bar');

window.addEventListener("scroll", () => {
    var y = window.scrollY;
    if (y >= 20) {
        topLogo.style.display = "none";
        topMenuBar.style.background = "#0abab5";
        topMenuBar.style.boxShadow = "1px 1px 5px rgba(0, 0, 0, 0.6)";
    } else {
        topLogo.style.display = "block";
        topMenuBar.style.background = "rgba(207,207,207,0.5)";
        topMenuBar.style.boxShadow = "none";
    }
});

/* ------------------------------------------------------------------------------------------------
SLIDER 
-------------------------------------------------------------------------------------------------*/

//propiedades slider

var propSlider = {
    slider: document.getElementById("slider"),
    primerSlide: null
}

//metodos slider

var metSlider = {

    inicio: function() {
        setInterval(metSlider.moverSlide, 3000);
    },

    moverSlide: function() {
        propSlider.slider.style.transition = "all 1s ease";
        propSlider.slider.style.marginLeft = "-100%";

        setTimeout(function() {
            propSlider.primerSlide = propSlider.slider.firstElementChild;
            propSlider.slider.appendChild(propSlider.primerSlide);
            propSlider.slider.style.transition = "unset";

            propSlider.slider.style.marginLeft = "0";
        }, 1000);
    }
}

metSlider.inicio();


/* ------------------------------------------------------------------------------------------------
tabs servicios
-------------------------------------------------------------------------------------------------*/


var propTabs = {
    primerEncabezado: document.getElementById("encabezado_menu").firstElementChild,
    primerContenido: document.getElementById("contenido_menu").firstElementChild,
    enlacesEncabezado: document.querySelectorAll("#encabezado_menu li a"),
    li_encabezado: document.querySelectorAll("#encabezado_menu li"),
    divs_contenido: document.querySelectorAll("#contenido_menu > div"),
    contenido_activo: null

}

//obj metodos

var metTabs = {

    inicio: function() {
        propTabs.primerEncabezado.className = "active";
        propTabs.primerContenido.className = "active";

        for (let i = 0; i < propTabs.enlacesEncabezado.length; i++) {
            propTabs.enlacesEncabezado[i].addEventListener("click", metTabs.evento)
        }
    },

    evento: function(e) {
        e.preventDefault();

        for (let i = 0; i < propTabs.li_encabezado.length; i++) {
            propTabs.li_encabezado[i].className = "";
        }

        for (let i = 0; i < propTabs.divs_contenido.length; i++) {
            propTabs.divs_contenido[i].className = "";
        }

        this.parentElement.className = "active";
        propTabs.contenido_activo = this.getAttribute("href");

        document.querySelector(propTabs.contenido_activo).className = "active";
        document.querySelector(propTabs.contenido_activo).style.opacity = 0;

        setTimeout(function() {
            document.querySelector(propTabs.contenido_activo).style.opacity = 1;
        }, 100);
    }
}

metTabs.inicio();


/* ------------------------------------------------------------------------------------------------
scroll
-------------------------------------------------------------------------------------------------*/

// Objeto con propiedades de efecto scroll

var metScroll = {

    inicio: function() {

        for (var i = 0; i < propScroll.scroll_suave.length; i++) {
            propScroll.scroll_suave[i].addEventListener('click', metScroll.moverse);
        }

        for (var i = 0; i < propScroll.volver_arriba.length; i++) {
            propScroll.volver_arriba[i].addEventListener('click', metScroll.subir);
        }

    },


    moverse: function(e) {
        e.preventDefault();
        clearInterval(propScroll.intervalo);
        propScroll.destino = this.getAttribute('href');
        propScroll.seccion_distancia = document.querySelector(propScroll.destino).offsetTop - 94;

        propScroll.posicion = window.pageYOffset;
        propScroll.intervalo = setInterval(function() {

            if (propScroll.posicion < propScroll.seccion_distancia) {

                propScroll.posicion += 30;

                if (propScroll.posicion >= propScroll.seccion_distancia) {
                    clearInterval(propScroll.intervalo);
                }

            } else {

                propScroll.posicion -= 30;

                if (propScroll.posicion <= propScroll.seccion_distancia) {
                    clearInterval(propScroll.intervalo);
                }

            }

            window.scrollTo(0, propScroll.posicion);

        }, 15);
    },

    subir: function(e) {
        e.preventDefault();
        clearInterval(propScroll.intervalo);

        propScroll.posicion = window.pageYOffset;
        propScroll.intervalo = setInterval(function() {

            if (propScroll.posicion > 0) {

                propScroll.posicion -= 30;

                if (propScroll.posicion <= 0) {
                    clearInterval(propScroll.intervalo);
                }

            } else {
                return;
            }

            window.scrollTo(0, propScroll.posicion);

        }, 15);

    }


}

metScroll.inicio();

var propScroll = {

    posicion: window.pageYOffset,
    scroll_suave: document.getElementsByClassName('scroll-suave'),
    volver_arriba: document.getElementsByClassName('volver-arriba'),
    destino: null,
    seccion_distancia: null,
    intervalo: null

}


// Objeto con métodos de efecto scroll


/* ------------------------------------------------------------------------------------------------
contacto
-------------------------------------------------------------------------------------------------*/
//obj propiedades

var propParallax = {

    section: document.querySelector(".parallax"),
    recorrido: null,
    limite: null
}

//obj metodos

var metParallax = {

    inicio: function() {
        window.addEventListener("scroll", metParallax.scrollParallax);
    },

    scrollParallax: function() {
        propParallax.recorrido = window.pageYOffset;
        propParallax.limite = propParallax.section.offsetTop + propParallax.section.offsetHeight;

        if (propParallax.recorrido > propParallax.section.offsetTop - window.outerHeight && propParallax.recorrido <= propParallax.limite) {
            propParallax.section.style.backgroundPositionY = (propParallax.recorrido - propParallax.section.offsetTop) / 1.5 + "px";
        } else {
            propParallax.section.style.backgroundPositionY = 0;
        }
    }

}

metParallax.inicio();



//obj proiedades

var propForm = {
    form: document.formulario_contacto,
    form_elements: document.formulario_contacto.elements,
    error: null,
    text_error: null,

}

//obj metodos

var metForm = {

    inicio: function() {
        for (let i = 0; i < propForm.form_elements.length; i++) {
            if (propForm.form_elements[i].type == "text" || propForm.form_elements[i].type == "email" || propForm.form_elements[i].nodeName.toLowerCase() == "textarea") {
                propForm.form_elements[i].addEventListener("focus", metForm.focusInput);
                propForm.form_elements[i].addEventListener("blur", metForm.blurInput);
            }
        }
        propForm.form.addEventListener("submit", metForm.validInput);
    },

    focusInput: function() {
        this.parentElement.children[1].className = "label active";
    },

    blurInput: function() {
        if (this.value == "") {
            this.parentElement.children[1].className = "label";
        }
    },

    validInput: function(e) {
        for (let i = 0; i < propForm.form_elements.length; i++) {
            if (propForm.form_elements[i].value == "") {

                e.preventDefault();

                if (propForm.form_elements[i].parentElement.children.length < 3) {
                    propForm.error = document.createElement("p");
                    propForm.text_error = document.createTextNode("Por favor llena el formulario con tu " + propForm.form_elements[i].name);

                    propForm.error.appendChild(propForm.text_error);

                    propForm.error.className = "error";

                    propForm.form_elements[i].parentElement.appendChild(propForm.error);
                }


            } else {
                if (propForm.form_elements[i].parentElement.children.length >= 3) {
                    propForm.error = propForm.form_elements[i].parentElement.getElementsByTagName("p")[0];
                    propForm.form_elements[i].parentElement.removeChild(propForm.error);
                }
            }
        }
    }

}

metForm.inicio();