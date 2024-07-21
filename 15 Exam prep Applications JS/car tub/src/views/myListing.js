import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyListings } from '../api/data.js';
import { carTemplate} from './common/car.js';

const myListingsTemplate = (myCars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

       ${myCars.length > 0 
            ? myCars.map(carTemplate)
            : html`<p class="no-cars"> You haven't listed any cars yet.</p>`
       }
        
    </div>
</section>`;

export async function myListingsPage(ctx) {
    const myCars = await getMyListings(ctx.user._id);
    ctx.render(myListingsTemplate(myCars));
}