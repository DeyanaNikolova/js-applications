import { logout } from '../api/data.js';
import { page, render} from '../lib.js';
import { getUserData } from '../util.js';

const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

export function updateUserNav() {
    const userData = getUserData();
    if(userData){
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
      //  document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline-block';
    }
}

function onLogout(){
    logout();
    updateUserNav();
    page.redirect('/catalog');
}

