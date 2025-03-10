import { showCatalog } from "./catalog.js";

const section = document.getElementById('createView');

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit)
section.remove();

export function showCreate() {
    document.querySelector('main').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title').trim();
   
    try {
        const response = await fetch('http://localhost:3030/data/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
        'X-Authorization': JSON.parse(sessionStorage.getItem('userData')).accessToken
    },
            body: JSON.stringify({title})
        });

        if(response.ok == false){
            const error = await response.json();
            throw Error(error.message);
        }
        showCatalog();
    } catch (err) {
       alert(err.message)
    }
}