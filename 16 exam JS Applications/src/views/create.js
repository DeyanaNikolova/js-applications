import { html } from '../lib.js';
import { createProduct } from '../api/data.js';


const Template = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Add Product</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="name" id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
            <input type="text" name="category" id="product-category" placeholder="Category" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50"></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" />

            <button type="submit">Add</button>
        </form>
    </div>
</section>`;

export function createPage(ctx) {
    ctx.render(Template(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const product = {
            name: formData.get('name').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            category: formData.get('category').trim(),
            description: formData.get('description').trim(),
            price: formData.get('price').trim()
        };

        if(Object.values(product).some(p => !p)){
            return alert('All fields are required!');
        }
        await createProduct(product);
        event.target.reset();
        ctx.page.redirect('/catalog');
    }
}