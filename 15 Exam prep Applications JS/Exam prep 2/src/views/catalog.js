import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../api/data.js';
import { bookPreview } from './common.js';


const catalogTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
   ${books.length == 0 ? html`
   <p class="no-books">No books in database!</p>`
    : html`<ul class="other-books-list">${books.map(bookPreview)}</ul>`}
</section>`;

export async function catalogPage(ctx) {
    const books = await getAllBooks();

    ctx.render(catalogTemplate(books));
}