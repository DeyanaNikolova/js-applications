import page from '../node_modules/page/page.mjs';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderNavigation, renderContent } from './middlewares/navRender.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/create.js';
import { deleteView } from './views/deleteView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutVeiw } from './views/logoutView.js';
import { registerView } from './views/registerView.js';
import { searchView } from './views/search.js';


page(authMiddleware);
page(renderNavigation);
page(renderContent);


page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutVeiw);
page('/catalog', catalogView);
page('/create', createView);
page('/search', searchView);
page('/albums/:id', detailsView);
page('/albums/:id/edit', editView);
page('/albums/:id/delete', deleteView);


page.start();