import { render } from './lib.js';
import articleTemplate from './templates/article.js';
import { onUntil } from './delay.js';

start();

async function start() {
    const data = await (await fetch('./data.json')).json();
    const content = document.querySelector('#content');

    const renderBtn = document.querySelector('#renderBtn');
    renderBtn.addEventListener('click', onRender);
 
    document.getElementById('changeBtn').addEventListener('click', changeArticle);
    document.getElementById('untilBtn').addEventListener('click', onUntil);
   

    function onRender() {
       // data[0].author += '1';
        const result = data.map(a => articleTemplate(onSubmit.bind(null, a), a));

        render(result, content);
    }

    function onSubmit(article, event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const content = formData.get('comment');
        article.comments.push({ content });
        
        onRender();
    }

    function changeArticle() {
        data.shift();
        data.unshift({
            'title': 'First Article 1234',
            'content': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
            'author': 'John Smith',
            "comments": [],
            "isOwner": true
        });
        onRender();
    }
}


