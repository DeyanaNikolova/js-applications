import { showHome } from './home.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';


const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
};
const nav = document.querySelector('nav');

nav.querySelector('#logoutBtn').addEventListener('click', onLogout);
nav.addEventListener('click', (event) => {
    const view = views[event.target.id];
    if (typeof view == 'function') {
        event.preventDefault();
        view();
    }
});

updateNav()
// Start application in home view (catalog)
showHome();

export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData != null){
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
       [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block'); 
       [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    }else{
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none'); 
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}

async function onLogout(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
 const {token} = JSON.parse(sessionStorage.getItem('userData'))
    await fetch('http://localhost:3030/users/logout', {
      headers:{
        'X-Authorization': token
      }
    });
    sessionStorage.removeItem('userData');
    updateNav();
    showLogin();
}











// window.showDetails = showDetails;
// window.showHome = showHome;
// window.showEdit = showEdit;
// window.showCreate = showCreate;
// window.showLigin = showLogin;
// window.showRegister = showRegister;

