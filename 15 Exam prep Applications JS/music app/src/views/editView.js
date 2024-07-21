import { html } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';
import { albumIsInvalid } from '../unils/validators.js';

const editTemplate = (album, submitHandler) => html`
<section class="editPage">
    <form @submit=${submitHandler} method="PUT">
        <fieldset>
            <legend>Edit Album</legend>
            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" value=${album.name} class="name" type="text">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" value=${album.imgUrl} class="imgUrl" type="text">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" value=${album.price} class="price" type="text">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" value=${album.releaseDate} class="releaseDate" type="text">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" value=${album.artist} type="text">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" value=${album.genre} type="text">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10" .value=${album.description}
                    cols="10"></textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>`;

export const editView = (ctx) => {

    const submitHandler = (e) => {
        e.preventDefault();

        const albumData = Object.fromEntries(new FormData(e.currentTarget));

        if (albumIsInvalid(albumData)) {
            alert('All fields are requered!')
            return;
        }

        albumService.edit(ctx.params.id, albumData)
            .then(() => {
                ctx.page.redirect(`/albums/${ctx.params.id}`);
            });
    };

    albumService.getAlbumById(ctx.params.id)
        .then(album => {
            ctx.render(editTemplate(album, submitHandler));
        });
};