import { html } from '../lib.js';
import { getProductById, editProduct } from '../api/data.js';


const editTemplate = (product, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                .value=${product.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                .value=${product.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                .value=${product.category}
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${product.description}
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                .value=${product.price}
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>`;




export async function editPage(ctx) {
    const productId = ctx.params.id;
    const product = await getProductById(productId);

    ctx.render(editTemplate(product, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const editedProduct = {
            name: formData.get('name').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            category: formData.get('category').trim(),
            description: formData.get('description').trim(),
            price: formData.get('price').trim()
        };

        if(Object.values(editedProduct).some(p => !p)){
            return alert('All fields are required!');
        }
        await editProduct(productId,editedProduct);
        event.target.reset();
        ctx.page.redirect('/details/' + productId);
    }
}