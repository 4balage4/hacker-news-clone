import RouterHandler from "./router.js";
import store from './store.js';

window.onhashchange = () => {
    setActiveLink()
}

function setActiveLink() {
    const links = document.querySelectorAll('.header-link');
    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        const currentPath = window.location.hash;
        if (currentPath == linkPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    })
}

class App {
    constructor() {
        // initializes RouterHandler
        new RouterHandler()
    }
}

new App();