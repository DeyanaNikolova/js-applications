import { logout } from '../api/data.js';
import { page, render} from '../lib.js';
import { getUserData } from '../util.js';

const root = document.querySelector('.main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

export function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

export function updateNav() {
    const userData = getUserData();
    if(userData){
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
       
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline-block';
    }
}

async function  onLogout(){
  await  logout();
    updateNav();
    page.redirect('/catalog');
}

