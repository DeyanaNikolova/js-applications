import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../api/games.js';
import { commentFormView } from './commentForm.js';
import { commentView } from './comments.js';


const detailsTemplate = (game, commentsSection, commentsFormSection, onDelete) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl} />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">${game.summary}</p>
    
            ${commentsSection}
          
            ${game.isOwner 
            ? html`
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>`
            : nothing
            }
        </div>
       
        ${commentsFormSection}
        
    </section>`;


export async function detailsView(ctx) {
    const gameId = ctx.params.id;
    
   const [game, commentsSection] = await Promise.all([
    gameService.getById(gameId),
    commentView(gameId)
   ]);
   
   if (ctx.user) {
       game.isOwner = ctx.user._id == game._ownerId;  
    }

    const commentsFormSection = await commentFormView(ctx, game.isOwner);

    ctx.render(detailsTemplate(game, commentsSection, commentsFormSection, onDelete));


    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${game.title}?`);
       if(choice){
       await gameService.deleteById(ctx.params.id);
        ctx.page.redirect('/');
        }
    }
}