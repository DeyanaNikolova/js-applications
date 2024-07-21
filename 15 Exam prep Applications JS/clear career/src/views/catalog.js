import { html } from '../lib.js';
import { getAllOffers } from '../api/data.js';

const catalogTemplate = (offers) => html`
 <section id="dashboard">
    <h2>Job Offers</h2>

   ${offers.length > 0
        ? offers.map(offerTemplate)
        : html`<h2>No offers yet.</h2>`
    }
       
</section>`;

const offerTemplate = (offer) => html`
<div class="offer">
    <img src=${offer.imageUrl} />
    <p>
        <strong>Title: </strong><span class="title">${offer.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
    <a class="details-btn" href="/details/${offer._id}">Details</a>
</div>`;

export async function catalogPage(ctx) {

    const offers = await getAllOffers();

    ctx.render(catalogTemplate(offers));
}