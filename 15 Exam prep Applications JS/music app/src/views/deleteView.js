import * as albumService from '../services/albumService.js';

export const deleteView = async (ctx) => {
    try {
        const album = await albumService.getAlbumById(ctx.params.id)

        let confirmed = confirm(`Are you sure you want to delete the album: ${album.name}?`);
    
        if (confirmed) {
            await albumService.remove(ctx.params.id);
            ctx.page.redirect('/catalog');

        }
       
    } catch (err) {
        alert(err);
    }
};