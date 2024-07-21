import { html, nothing } from '../lib.js';
import { getProductById, deleteProduct } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (product, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${product.imageUrl} alt="example1" />
        <p id="details-title">${product.name}</p>
        <p id="details-category">
            Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${Number(product.price)}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">0</span> times.</h4>
                <span>${product.description}</span>
            </div>
        </div>
        ${isOwner 
        ? html`<div id="action-buttons">
                <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
        : nothing }
       
       
            <!--Bonus - Only for logged-in users ( not authors )-->
            <a href="" id="buy-btn">Buy</a>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {

    const productId = ctx.params.id
    const product = await getProductById(productId);
    const user = getUserData();

    const isOwner = user && user._id == product._ownerId;

    ctx.render(detailsTemplate(product, isOwner, onDelete));

    async function onDelete() {
        const confirmation = confirm(`Are you sure you want to delete ${product.name}`);

        if(confirmation){
            await deleteProduct(productId);
            ctx.page.redirect('/catalog');
        } 
    }
}