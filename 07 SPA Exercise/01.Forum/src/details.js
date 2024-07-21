const section = document.getElementById('detailsView');
section.remove();


export function showDetails(ev) {

    let target = ev.target;

    if(target.tagName == 'H2'){
        target = target.parentElement;
    }

    if(target.tagName == 'A'){
        ev.preventDefault();
        const postId = target.id;
        showPost(postId);
    }
}

function showPost(postId) {
    document.getElementById('main').replaceChildren(section);
   console.log(postId); 
}