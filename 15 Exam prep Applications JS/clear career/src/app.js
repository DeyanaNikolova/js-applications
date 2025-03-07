import { page } from './lib.js';
import { decorateContext, updateUserNav} from './middlewares/decorContext.js';

import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';



page(decorateContext);
updateUserNav();

page('/', homePage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/edit/:id', editPage);

page.start();