import { html } from '../lib.js';
import { getMyBooks } from '../api/data.js';
import { getUserData } from '../util.js';

const myBooksTemplate = (myBooks)=> html`
  <section id="my-books-page" class="my-books">
    <h1>My Books</h1>
   ${myBooks.length > 0
    ? html` <ul class="my-books-list">    
        ${myBooks.map(bookCard)}
        </ul>`
    : html`<p class="no-books">No books in database!</p>`}
    
</section>`

const bookCard = (book) => html`
 <li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function myBooksPage(ctx) {

    const user = getUserData();
    const myBooks = await getMyBooks(user._id);
  
    ctx.render(myBooksTemplate(myBooks));
}