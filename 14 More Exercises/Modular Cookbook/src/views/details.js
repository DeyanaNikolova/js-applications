import { html } from '../../node_modules/lit-html/lit-html.js';
import * as recipeService from '../api/recipe.js';
import { getUserData, clearUserData } from '../util.js';





const detailsTemplate = (recipe, isOwner, onDelete) => html`
<section id="details">
    <article>
        <h2>${recipe.name}</h2>
        <div class="band">
            <div class="thumb"><img src=${recipe.img}></div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${recipe.steps.map(s => html`<p>${s}</p>`)}
        </div>

        ${isOwner ? html`<div class="controls">
            <a class="actionLink" href="/edit/${recipe._id}">✎ Edit</a>
            <a @click=${onDelete} class="actionLink" href="javascript:void(0)">✖ Delete</a>
        </div>` : null}
    </article>
</section>`;

export function detailsPage(ctx) {
    const recipe = ctx.recipe;

    const userData = getUserData();
  
    const isOwner = userData._id == recipe._ownerId;

    ctx.render(detailsTemplate(recipe, isOwner, onDelete));

 
    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this recipe?');
    
        if(choice){
            await recipeService.deleteRecipe(recipe._id);
            clearUserData();
            ctx.page.redirect('/');
        }
    }
}



