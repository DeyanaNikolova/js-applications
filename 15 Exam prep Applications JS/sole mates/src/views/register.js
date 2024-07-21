import { html } from '../lib.js';
import { register } from '../api/data.js';

const registerTemplate = (onRegister) => html`
 <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegister} class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('re-password').trim();

        if(email == '' || password == '' || repass == ''){
            return alert('Please fill all fields.');
        }
        if(password != repass){
            return alert('Passwords don\'t match!');
        }
         await register(email, password);
         event.target.reset();
         ctx.updateNav();
         ctx.page.redirect('/catalog');
    }
}