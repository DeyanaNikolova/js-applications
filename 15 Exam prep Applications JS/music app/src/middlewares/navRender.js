import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigationView.js';

const headerEl = document.querySelector('.header-navigation');
const contentEl = document.getElementById('main-content');

const ctxRender = (templateResult) =>{
    render(templateResult, contentEl);
};

export const renderNavigation = (ctx, next) =>{
    render(navigationView(ctx), headerEl);
    next();
};

export const renderContent = (ctx, next) =>{
    ctx.render = ctxRender;
    next();
};