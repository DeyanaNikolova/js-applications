function attachEvents() {

    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}
attachEvents();

async function displayPost() {
    // get selected value from list
    // load post
    // load comments for post
    // render data
    const titpleEl = document.getElementById('post-title'); 
    const bodyEl = document.getElementById('post-body');
    const ulEl = document.getElementById('post-comments');

    titpleEl.textContent = 'Loading...';
    bodyEl.textContent = '';
    ulEl.replaceChildren();

    const selectedId = document.getElementById('posts').value;

    const [post, comments] = await Promise.all([
        getPostById(selectedId),
        addComment(selectedId)
    ]);

    titpleEl.textContent = post.title;
    bodyEl.textContent = post.body;

    comments.forEach(c => {
        const liEl = document.createElement('li');
        liEl.textContent = c.text;
        ulEl.appendChild(liEl);
    });
}

async function loadPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const res = await fetch(url);
    const data = await res.json();

    // parse data and populate list
    const selectEl = document.getElementById('posts');
    selectEl.replaceChildren();  // clean the list of options

    Object.values(data).forEach(e => {
        const option = document.createElement('option');
        option.value = e.id;
        option.textContent = e.title;
        selectEl.appendChild(option);
    });
}

async function getPostById(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    const res = await fetch(url);
    const data = await res.json();
    return data;
}

async function addComment(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/comments';
    const res = await fetch(url);
    const data = await res.json();

    const comments = Object.values(data).filter(c => c.postId == postId);
    return comments;
}



