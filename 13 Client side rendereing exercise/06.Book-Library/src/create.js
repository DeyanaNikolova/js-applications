import { createBook, html } from './utility.js';

const createTemplate = (onSuccess) => html`
  <form @submit=${event => onSubmit(event, onSuccess)} id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`;

export function showCreate(ctx) {
  if(ctx.book == undefined){
    return createTemplate(ctx.update);    
  }else{
    return null;
  }
}

async function onSubmit(event, onSuccess) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const title = formData.get('title').trim();
  const author = formData.get('author').trim();

  await createBook({ title, author });
  event.target.reset();
  onSuccess();
}