import { initialize } from './router.js';
import { logout } from './api/users.js';
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";


document.getElementById('views').remove();

const links = {
    '/': showHome,
    '/catalog': showCatalog,
    '/register': showRegister,
    '/login': showLogin,
    '/details': showDetails,
    '/create': showCreate,
    'logout': onLogout
};

const router = initialize(links);
router.updateNav();
// Start application in home view
router.goTo('/');

async function onLogout(event) {
    event.preventDefault();
   await logout();
    router.updateNav();
    router.goTo('/');
}








