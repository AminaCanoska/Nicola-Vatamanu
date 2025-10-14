import {qs, qsa, ce} from './utilities/shortcuts.js';

function checkScreenSize() {
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const navBar = qs(".navbar");
  const btnNavbar = qs("#btnNavbar");
  const btnSocials = qs("#btnSocials");

  if (!navBar || !btnNavbar || !btnSocials) return;

  // Rimuovi menu se esiste (utile in tutti i resize)
  const existingMenu = qs(".menu");
  if (existingMenu) {
    existingMenu.remove();
    document.body.classList.remove('no-scroll');
  }

  if (isMobile) {
    // Nascondi i bottoni originali nella navbar
    btnNavbar.style.setProperty("display", "none", "important");
    btnSocials.style.setProperty("display", "none", "important");

    // Controlla se hamburger esiste, altrimenti crealo
    let hamburgerMenu = qs(".menu-open");
    if (!hamburgerMenu) {
      hamburgerMenu = ce("i");
      hamburgerMenu.classList.add("bi", "bi-list", "menu-open");
      navBar.appendChild(hamburgerMenu);
      hamburgerMenu.addEventListener("click", () => {
        const menuOpen = qs(".menu");
        if (!menuOpen) {
          openMenu();
          hamburgerMenu.classList.replace("bi-list", "bi-x-lg");
          navBar.style.backgroundColor = 'white';
        } else {
          closeMenu();
          hamburgerMenu.classList.replace("bi-x-lg", "bi-list");
          navBar.style.backgroundColor = '';
        }
      });
    }
  } else {
    // Versione desktop: mostra bottoni e rimuovi hamburger + menu
    btnNavbar.style.setProperty("display", "", "important");
    btnSocials.style.setProperty("display", "", "important");

    const hamburgerMenu = qs(".menu-open");
    if (hamburgerMenu) hamburgerMenu.remove();

    document.body.classList.remove('no-scroll');
  }

  // Funzioni per aprire/chiudere menu
  function openMenu() {
    const btnContainer = ce("div");
    btnContainer.classList.add("menu");

    // Profilo e nome
    const profile = ce("div");
    const nameNV = ce("h1");
    nameNV.textContent = "NICOLA VATAMANU";
    nameNV.classList.add("hammersmith-one", "nv-mobile");
    profile.appendChild(nameNV);
    btnContainer.appendChild(profile);

    // Clona bottoni per menu
    const clonedNavbar = btnNavbar.cloneNode(true);
    const clonedSocials = btnSocials.cloneNode(true);

    clonedNavbar.style.setProperty("display", "", "important");
    clonedSocials.style.setProperty("display", "", "important");

    clonedNavbar.classList.add("btn-navbar-open", "montserrat");
    clonedSocials.classList.add("btn-socials-open");

    // Aggiungi "CONTATTI:" sopra socials
    const contatti = ce("p");
    contatti.textContent = "CONTATTI:";
    contatti.classList.add("montserrat");
    clonedSocials.insertAdjacentElement("afterbegin", contatti);

    // Aggiungi classi pulsanti ai bottoni clonati
    const headerBtns = clonedNavbar.querySelectorAll(".header-buttons");
    headerBtns.forEach(el => {
      if (el.getAttribute('aria-current') === 'current-aria') {
        el.classList.add("home");
      }
      el.classList.add("menu-btns");
    });

    btnContainer.appendChild(clonedNavbar);
    btnContainer.appendChild(clonedSocials);

    navBar.parentNode.insertBefore(btnContainer, navBar.nextSibling);

    // Blocca scroll corpo
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    const menu = qs(".menu");
    if (menu) menu.remove();
    document.body.classList.remove('no-scroll');
  }
}

// Eventi
window.addEventListener("resize", checkScreenSize);
window.addEventListener("load", checkScreenSize);



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

