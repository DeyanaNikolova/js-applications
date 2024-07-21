import { showVeiw } from "./util.js";


const section = document.querySelector('#edit-movie');

const editBtn = document.querySelector('#movie-example .btn-warning');
editBtn.addEventListener('click', editPage);


const form = section.querySelector('form');


export function editPage() {
    showVeiw(section);
   console.log('is clickled');
}