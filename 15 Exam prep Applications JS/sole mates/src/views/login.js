import { html } from '../lib.js';
import { login } from '../api/data.js';

const loginTemplate = (onLogin) => html`
 <section id="login">
    <div class="form">
    <h2>Login</h2>
    <form @submit=${onLogin} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password"/>
        <button type="submit">login</button>
        <p class="message">
        Not registered? <a href="/register">Create an account</a>
        </p>
    </form>
    </div>
</section>`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if(email == '' || password == ''){
            return alert('Please fill all fields.');
        }
         await login(email, password);
         event.target.reset();
         ctx.updateNav();
         ctx.page.redirect('/catalog');
    }
}