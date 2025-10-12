import {qs, qsa, ce, el, rv, tc, log} from '../docs/utilities/shortcuts.js'
export * from './functions.js'

const navBar = qs(".navbar");
let btnNavbar = qs("#btnNavbar");
let btnSocials = qs("#btnSocials");
let contatti = null
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