import { html } from '../lib.js';
import { getAllProducts } from '../api/data.js';

const catalogTemplate = (products) => html`
 <h2>Products</h2>
<section id="dashboard">
   
    ${products.length == 0 
    ? html`<h2>No products yet.</h2>`
    : products.map(productCard)
    }
</section>`;

const productCard = (product) => html`
<div class="product">
    <img src=${product.imageUrl} alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${Number(product.price)}</span>$</p>
    <a class="details-btn" href="/details/${product._id}">Details</a>
</div>`;

export async function catalogPage(ctx) {
const products = await getAllProducts();
console.log(products);
    ctx.render(catalogTemplate(products));
}