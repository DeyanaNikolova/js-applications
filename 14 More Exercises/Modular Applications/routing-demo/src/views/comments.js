import { html, nothing } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { repeat } from '../node_modules/lit-html/directives/repeat.js';
import { cache } from '../node_modules/lit-html/directives/cache.js';
import { createSubmitHendler } from '../data/util.js';
import { createComments, getCommentsByCarId } from '../data/servece.js';


const commentTemplate = (comments, commentForm) => html`
<div id="comments">
    ${commentForm}
    <ul class="coment-list">
        ${repeat(comments, c => c._id, commentCard)}
    </ul>
</div>`;


const commentCard = comment => html`
<li>${comment.content}</li>`;


const formTemplate = (onSubmit) => html`
<form @submit=${onSubmit}>
    <textarea name="content"></textarea>
    <input type="submit" value="Post comment">
</form>`;


export function commentsView(ctx) {
    return until(commentsWrapper(ctx), 'Loadind comment...');
}

async function commentsWrapper(ctx) {
    const carId = ctx.params.id;

    const comments = await getCommentsByCarId(carId);

    return cache(commentTemplate(
        comments,
        ctx.userData ? formTemplate(createSubmitHendler(onSubmit)) : nothing
    ));

    async function onSubmit(data, form) {
        await createComments(carId, data.content);
        form.reset();
        ctx.page.redirect('/catalog/' + carId);
    }
}