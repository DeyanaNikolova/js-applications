import * as userService from '../services/userServise.js';


export const logoutVeiw = (ctx) => {
    userService.logout()
        .then(() => {
            ctx.page.redirect('/');
        });
};