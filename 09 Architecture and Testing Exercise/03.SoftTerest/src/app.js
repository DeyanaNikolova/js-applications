import './src/api/api.js';
import './src/views/home.js';


let main = document.querySelector('main');
 

function showSection(name) {
    main.replaceChildren(name);
}
