import { homePage } from "./home.js";
import { showView } from "./util.js";
import { updateNav } from "./util.js";

const section = document.querySelector('#form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function loginPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    await login(email, password);
    form.reset();
    homePage();
    updateNav();
}

async function login(email, password) {
    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

// window.login = login;