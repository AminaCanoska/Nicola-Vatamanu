function qs(selector){
    if (!selector) throw new Error("qs: selector is required");
    return document.querySelector(selector);
}
function qsa(selector){
    if (!selector) throw new Error("qs: selector is required");
    return Array.from(document.querySelectorAll(selector));
}
function ce(element){
    return document.createElement(element)
}

function el(element, event, callback){
    element.addEventListener(event, callback);
}
/*
//Esempio d'uso:
el(qs('#btn'), 'click', () => alert('Cliccato!'));
*/

function appC(parent, child){
    parent.appendChild(child);
}
/*
//Esempio d'uso:
const el = ce('div');
appC(qs('body'), el);
*/

function rv(element){
    element.remove()
}
function tc(el, text){
    el.textContent = text;
}
//Esempio d'uso:
const title = ce("h1")
tc(title, "Welcome to my Website")

const log = console.log;

export {qs, qsa, ce, el, appC, rv, tc, log}