import { renderTemplate } from './engine.js';

async function start() {
    const data = await (await fetch('./data.json')).json();
    const templateAsString = await (await fetch('./article.html')).text();

    const main = document.querySelector('main');
    const template = renderTemplate(templateAsString);

    //const result = renderTemplate(template, data[0]);

    main.innerHTML = data.map(template).join('');
}
start();