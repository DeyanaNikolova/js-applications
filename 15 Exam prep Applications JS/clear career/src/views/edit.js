import { html } from '../lib.js';
import { getOfferById, editOffer } from '../api/data.js';

const editTemplate = (offer, onSubmit) => html`
<section id="edit">
    <div class="form">
    <h2>Edit Offer</h2>
    <form @submit=${onSubmit} class="edit-form">
        <input
        type="text"
        name="title"
        id="job-title"
        placeholder="Title"
        .value=${offer.title}
        />
        <input
        type="text"
        name="imageUrl"
        id="job-logo"
        placeholder="Company logo url"
        .value=${offer.imageUrl}
        />
        <input
        type="text"
        name="category"
        id="job-category"
        placeholder="Category"
        .value=${offer.category}
        />
        <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        rows="4"
        cols="50"
        .value=${offer.description}
        ></textarea>
        <textarea
        id="job-requirements"
        name="requirements"
        placeholder="Requirements"
        rows="4"
        cols="50"
        .value=${offer.requirements}
        ></textarea>
        <input
        type="text"
        name="salary"
        id="job-salary"
        placeholder="Salary"
        .value=${offer.salary}
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const offerId = ctx.params.id
    const offer = await getOfferById(offerId);

    ctx.render(editTemplate(offer, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const editedOffer = {
            title: formData.get('title').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            category: formData.get('category').trim(),
            description: formData.get('description').trim(),
            requirements: formData.get('requirements').trim(),
            salary: formData.get('salary').trim()
        };
        if(Object.values(editedOffer).some(f => !f)){
            return alert('All fields are required!');
        }
        await editOffer(offerId, editedOffer);
        event.target.reset();
        ctx.page.redirect('/details/' + offerId);
    }
}