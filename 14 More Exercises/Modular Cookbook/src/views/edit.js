import { html } from '../../node_modules/lit-html/lit-html.js';
import * as recipeService from '../api/recipe.js';
//import { createSubmitHandler } from '../util.js';


const editTemplate = (recipe, onSubmit) => html`
 <section id="edit">
        <article>
            <h2>Edit Recipe</h2>
            <form @submit=${onSubmit} id="editForm">
                <label>Name: <input type="text" name="name" placeholder=${recipe.name}></label>
                <label>Image: <input type="text" name="img" placeholder=${recipe.img}></label>
                <label class="ml">Ingredients: <textarea name="ingredients" 
                    placeholder=${recipe.ingredients}></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" 
                    placeholder=${recipe.steps}></textarea></label>
                <input type="submit" value="Edit Recipe">
            </form>
        </article>
    </section>`;


export function editPage(ctx) {
    
    ctx.render(editTemplate(recipe, onSubmit));

}

async function onSubmit(ctx, event) {
    const recipe = await recipeService.getById(ctx.params.id);
    console.log(recipe);
  
 

    event.target.reset();

    ctx.page.redirect('/details/' + result._id);
}