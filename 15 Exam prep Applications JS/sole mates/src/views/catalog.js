import { html } from '../lib.js';
import { getAll } from '../api/data.js';

const catalogTemplate = (items) => html`
  <section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">

        ${items.length > 0 
        ? items.map(itemCard)
        : html` <h2>There are no items added yet.</h2>`}

    </ul> 
   
</section>`;

const itemCard = (item) => html`
 <li class="card">
    <img src=${item.imageUrl} alt="eminem" />
    <p>
    <strong>Brand: </strong><span class="brand">${item.brand}</span>
    </p>
    <p>
    <strong>Model: </strong
    ><span class="model">${item.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
    <a class="details-btn" href="/details/${item._id}">Details</a>
</li>`;

export async function catalogPage(ctx) {
    const items = await getAll();
    ctx.render(catalogTemplate(items))

}