import { showCreate } from './create.js';
import { showVeiw } from './dom.js';
import { e } from './dom.js';
import { showDetails } from './details.js';

const section = document.getElementById('home-page');
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center');
section.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate()
});
catalog.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
    if (target.tagName == 'BUTTON') {
        target = target.parentElement;
    }
    if (target.tagName == 'A') {
        const id = target.dataset.id;
        showDetails(id)
    }
});

section.remove();

export function showHome() {
    showVeiw(section);
    getMovies();
}

async function getMovies() {
    catalog.replaceChildren(e('p', 'Loading...'));

    const response = await fetch('http://localhost:3030/data/movies');
    const data = await response.json();
    

    catalog.replaceChildren(...data.map(createMovieCard));
}

function createMovieCard(movie) {
    const element = e('div', { className: 'card mb-4' });
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
       alt="Card image cap" width="400">
    <div class="card-body">
       <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a data-id=${movie._id} href="#">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>`;

    return element;
}
/*
<div class="card mb-4">
    <img class="card-img-top" src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">Black Widow</h4>
    </div>
    <div class="card-footer">
        <a href="#/details/krPgQD6SWf39bM4x00co">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>
</div>
 */

//window.getMovies = getMovies;
