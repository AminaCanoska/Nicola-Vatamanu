import {qs, qsa, ce, el, rv, tc, log} from './utilities/shortcuts.js'

// NAVBAR VERSIONE MOBILE
function checkScreenSize() {
    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    const navBar = qs(".navbar");
    let btnNavbar = qs("#btnNavbar");
    let btnSocials = qs("#btnSocials");
    let contatti = null

    if (!navBar || !btnNavbar || !btnSocials) return;

    // Versione mobile
    if (isMobile) {
        btnNavbar.style.setProperty("display", "none", "important");
        btnSocials.style.setProperty("display", "none", "important");

        let hamburgerMenu = qs(".menu-open");
        // Evita duplicazioni di hamburger
        if (!qs(".menu-open")) {
            hamburgerMenu = ce("i");
            hamburgerMenu.classList.add("bi", "bi-list", "menu-open");
            navBar.appendChild(hamburgerMenu);
            hamburgerMenu.addEventListener("click", toggleMenu);
        }

        function toggleMenu() {
            const isOpen = qs(".menu") !== null;
            if (!isOpen) {
                openMenu();
                hamburgerMenu.classList.remove("bi-list");
                hamburgerMenu.classList.add("bi-x-lg");
                navBar.style.backgroundColor = 'white';
                console.log("Menu aperto");
            } else {
                closeMenu();
                hamburgerMenu.classList.remove("bi-x-lg");
                hamburgerMenu.classList.add("bi-list");
                navBar.style.backgroundColor = '';
                console.log("Menu chiuso");
            }
        }

        function openMenu() {
            // Crea contenitore menu mobile
            const btnContainer = ce("div");
            btnContainer.classList.add("menu");

            // Profilo e nome
            const profile = ce("div");
            const nameNV = ce("h1");
            nameNV.textContent = "NICOLA VATAMANU";
            nameNV.classList.add("hammersmith-one", "nv-mobile");
            profile.appendChild(nameNV);
            btnContainer.appendChild(profile);

            // Mostra pulsanti
            btnNavbar.style.setProperty("display", "", "important");
            btnSocials.style.setProperty("display", "", "important");
            btnNavbar.classList.add("btn-navbar-open", "montserrat");
            btnSocials.classList.add("btn-socials-open");

            const headerBtns = qsa(".header-buttons");
            headerBtns.forEach(el => {
                if (el && el.getAttribute('aria-current') === 'current-aria') {
                    el.classList.add("home");
                }
                el.classList.add("menu-btns");
            });

            //mostra sede
            let sede =qs("#sede");

              if (sede) {
                sede.removeEventListener("click", initSedeToggle); 

                sede.addEventListener("click", initSedeToggle);
              }

            //mostra contatti 
            if(!contatti){
              contatti = ce("p")
              contatti.textContent = "CONTATTI:";
              contatti.classList.add("montserrat")
              btnSocials.insertAdjacentElement("afterbegin", contatti);
            }

            btnContainer.appendChild(btnNavbar);
            btnContainer.appendChild(btnSocials);

            if (navBar && navBar.parentNode) {
              navBar.parentNode.insertBefore(btnContainer, navBar.nextSibling);
            }
            document.body.classList.add('no-scroll');

        }

        function closeMenu() {
            console.log("chiuso");
            const menu = qs(".menu");
            console.log(menu);
            menu.remove();

            btnNavbar.style.setProperty("display", "none", "important");
            btnSocials.style.setProperty("display", "none", "important");
            btnNavbar.classList.remove("btn-navbar-open");
            btnSocials.classList.remove("btn-socials-open");
            document.body.classList.remove('no-scroll');
        }
    } else {
        btnNavbar.style.setProperty("display", "", "important");
        btnSocials.style.setProperty("display", "", "important");
    }
}

// Avvia all'inizio e al resize
//window.addEventListener("resize", checkScreenSize);
checkScreenSize();


//NAVBAR: SEDE 
function initSedeToggle() {

  
  const sedeBtn = document.querySelector("#sede");
  if (!sedeBtn) return;
  console.log("sedeBtn:", sedeBtn);


  let sedeContainer = null;

  function outsideClickHandler(e) {
    if (
      sedeContainer &&
      !sedeContainer.contains(e.target) &&
      !sedeBtn.contains(e.target)
    ) {
      sedeContainer.remove();
      sedeContainer = null;
      document.removeEventListener("click", outsideClickHandler);
    }
  }
  sedeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (sedeContainer) {
      sedeContainer.remove();
      sedeContainer = null;
      document.removeEventListener("click", outsideClickHandler);
      return;
    }


    const navbar = qs(".navbar");
    if (!navbar) return;

    sedeContainer = ce("div");
    sedeContainer.classList.add("sede-container");

    const info = ce("div");

    const p1 = ce("p");
    p1.textContent = "AZZANO DECIMO 33082";
    const p2 = document.createElement("p");
    p2.textContent = "Via Ilaria Alpi, 3710";

    info.appendChild(p1);
    info.appendChild(p2);
    sedeContainer.appendChild(info);

    const ratio = ce("div");
    ratio.classList.add("ratio", "ratio-16x9");

    const iframe = ce("iframe");
    iframe.src = "https://www.google.com/maps?q=Via+Ilaria+Alpi+3%2F10+Azzano+Decimo+33082&output=embed";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.style.border = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";

    ratio.appendChild(iframe);
    sedeContainer.appendChild(ratio);

    const orari = ce("div");
    orari.classList.add("orari-apertura", "montserrat");
    
    const hOrari = ce("h4");
    hOrari.textContent = "ORARI DI APERTURA";
    
    const ulOrari = ce("ul");
    const giorni = [
      ["Lunedì - Venerdì", "08:30 - 17:30"],
      ["Sabato", "09:00 - 13:00"],
      ["Domenica", "Chiuso"]
    ];
    
    giorni.forEach(([giorno, orario]) => {
      
      const li = document.createElement("li");
      li.textContent = `${giorno}: ${orario}`;
      ulOrari.appendChild(li);  
    });
    
    orari.appendChild(hOrari);
    orari.appendChild(ulOrari);
   sedeContainer.appendChild(orari);

    

    navbar.insertAdjacentElement("afterend", sedeContainer);

    document.addEventListener("click", outsideClickHandler);
  });
}

initSedeToggle();

//INVIO PRENOTAZIONE

function inizializzaFormPrenotazione() {
  const formPrenotazione = document.getElementById("formPrenotazione");
  const messageBox = document.getElementById("formMessage");
  const formWrapper = formPrenotazione.querySelector(".form-wrapper");

  if (!formPrenotazione || !messageBox || !formWrapper) {
    console.error("Form, messaggio o contenitore non trovati.");
    return;
  }

  formPrenotazione.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(formPrenotazione);

    try {
      const resp = await fetch("https://formspree.io/f/xeorzpbz", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await resp.json();
      console.log("Risposta Formspree:", data);

      if (resp.ok) {
        // Nascondi tutto il form
        formWrapper.style.display = "none";

        // Mostra solo il messaggio
        messageBox.style.display = "block";
        messageBox.style.backgroundColor = "#d4edda";
        messageBox.style.color = "#155724";
        messageBox.textContent = "✅ Prenotazione inviata con successo!";

        // Reset del form (dati)
        formPrenotazione.reset();

        // Dopo 3 secondi, chiudi la modale e resetta
        setTimeout(() => {
          // Chiudi la modale (Bootstrap 5)
          const modalElement = document.getElementById("prenotazioneModal");
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();

          // Ripristina form e nascondi messaggio
          formWrapper.style.display = "block";
          messageBox.style.display = "none";
          messageBox.textContent = "";
        }, 3000);
      } else {
        alert("❌ Errore durante l'invio: " + (data.error || "Errore sconosciuto."));
      }
    } catch (err) {
      console.error("Errore durante la fetch:", err);
      alert("❌ Errore tecnico durante l'invio.");
    }
  });
}

inizializzaFormPrenotazione();


//CAROUSSEL MASSAGGI 
function initCarousel() {
  const splide = new Splide('#massaggi-carousel', {
    type      : 'loop',
    perPage   : 3,
    focus     : 'center',
    gap       : '2rem',
    autoplay  : true,     
    interval  : 2500,      
    pauseOnHover: false,   
    arrows      : false,  
    pagination  : false,  

    breakpoints: {
      992: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      },
    },
  });

  splide.mount();
  
  
  const slides = qsa('#massaggi-carousel .splide__slide');
  slides.forEach(( slide, index) => {
    slide.addEventListener('click', () => {
        splide.go(index); 
        splide.Components.Autoplay.pause();
    });
  });

}

// Esecuzione diretta (senza listener)
function waitForSplideAndInit() {
  if (typeof Splide === 'undefined') {
    setTimeout(waitForSplideAndInit, 50);
  } else {
    initCarousel();
  }
}

waitForSplideAndInit();




//COOKIES
function setCookie(nome, valore, giorni) {
  const scadenza = new Date(Date.now() + giorni * 86400000).toUTCString();
  const cookieStr = `${nome}=${encodeURIComponent(valore)}; expires=${scadenza}; path=/; Secure; SameSite=Lax`;
  document.cookie = cookieStr;
  console.log("Cookie settato:", cookieStr);

}

function getCookie(nome) {
  return document.cookie
    .split('; ')
    .find(c => c.startsWith(nome + '='))?.split('=')[1];
}

function acceptCookies() {
  console.log("accettata")
  setCookie('cookie_consent', 'true', 365);
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}

function declineCookies() {
  setCookie('cookie_consent', 'false', 365);
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}

function salvaTemaChiaro() {
  const consent = getCookie('cookie_consent');
  if (consent === 'true') {
    setCookie('tema', 'chiaro', 30);
    alert("Tema salvato (chiaro) usando un cookie!");
  } else {
    alert("Devi accettare i cookie per salvare le preferenze.");
  }
}

// ✅ Funzione unica di inizializzazione
function initCookieBanner() {
  const btnAccept = document.getElementById("btn-accept");
  const btnDecline = document.getElementById("btn-decline");
  const btnSalvaTema = document.getElementById("btn-salva-tema");
  const banner = document.getElementById("cookie-banner");

  if (btnAccept) btnAccept.addEventListener("click", acceptCookies);
  if (btnDecline) btnDecline.addEventListener("click", declineCookies);
  if (btnSalvaTema) btnSalvaTema.addEventListener("click", salvaTemaChiaro);

  const consent = getCookie("cookie_consent");
  if ((consent === "true" || consent === "false") && banner) {
    banner.style.display = "none";
  }
}
initCookieBanner()

