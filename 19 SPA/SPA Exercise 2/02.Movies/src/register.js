import { homePage } from "./home.js";
import { showView } from "./util.js";
import { updateNav } from "./util.js";

const section = document.querySelector('#form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function registerPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('repeatPassword');
    console.log(rePassword);

    if (email && password == rePassword || password.length >= 6) {

        await onRegister(email, password, rePassword);
        form.reset();
        homePage();
        updateNav();
    } else{
        alert('Password must be at least 6 characters')
    }
}

async function onRegister(email, password) {
    try {
        const response = await fetch('http://localhost:3030/users/register', {
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