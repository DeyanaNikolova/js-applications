import { html } from '../lib.js';
import commentTemplate from './comments.js';

const articleTemplate = (onSubmit, data) => html`
<article>
<input type="text" ?disabled=${data.disabled} .value=${data.color} />
    <h3>${data.title}</h3>
    <div class=${data.color}>
        <p>${data.content}</p>
    </div>
    <footer>Author: ${data.author}${data.isOwner ? html`<button>Edit</button>` : null}</footer>
    <div class="comments">
        <form @submit=${onSubmit}>
            <textarea name="comment"></textarea>
            <button>Submit comment</button>
        </form>
        <ul>
        ${data.comments.map(commentTemplate)}
        </ul>
    </div>
</article>`;

export default articleTemplate;