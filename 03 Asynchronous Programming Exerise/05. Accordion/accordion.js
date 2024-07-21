// async function solution() {

//     try {
//         let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
//         let response = await fetch(url);

//         if (!response.ok) {
//             throw new Error('Error obtaining article list');
//         }
//         let data = await response.json();

//         data.forEach(article => {
//             let articleElement = document.createElement('div');
//             articleElement.classList.add('accordion');
//             articleElement.innerHTML =
//                 `
//             <div class="head">
//                 <span>${article.title}</span>
//                 <button class="button" id="${article._id}" onclick="moreOnClick">More</button>
//             </div>
//             <div class="extra"></div>
//             `
//             let main = document.getElementById('main');
//             main.appendChild(articleElement);
//         });

//     } catch (error) {
//         console.log('error');
//     }

// }
// async function moreOnClick(e) {
//     try {

//         let url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + e.currentTarget.id;
//        // let currentTarget = e.currentTarget;
//         let parent = e.currentTarget.parentNode.parentNode;
//         let extraDiv = parent.querySelector('div.extra');

//         let response = await fetch(url)

//         if (!response.ok) {
//             throw new Error('Error obtaining content');
//         }
//         let data = await response.json();
//         console.log(data);

//         extraDiv.innerHTML = `<p>${data.content}</p>`;

//         if (e.currentTarget.textContent == 'More') {

//             e.currentTarget.textContent = 'Less';
//             extraDiv.style.display = 'block';
//         } else {
//             e.currentTarget.textContent = 'More';
//             extraDiv.style.display = 'none';
//         }

//     } catch (error) {
//         console.log('error');
//     }
// }

async function solution() {

    const main = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const response = await fetch(url);
    const data = await response.json();

    data.forEach(a => {
        let divAccordion = createElement('div', '', ['class', 'accordion']);
        let divHead = createElement('div', '', ['class', 'head']);
        let span = createElement('span', a.title);
        let button = createElement('button', 'More', ['class', 'button', 'id', a._id]);
        let divExtra = createElement('div', '', ['class', 'extra']);
        let p = createElement('p');

        button.addEventListener('click', toggle);

        divExtra.appendChild(p);
        divHead.appendChild(span);
        divHead.appendChild(button);

        divAccordion.appendChild(divHead);
        divAccordion.appendChild(divExtra);
        main.appendChild(divAccordion);
    });

    async function toggle(e) {

        const extra = e.target.parentNode.parentNode.children[1];
        const p = e.target.parentNode.parentNode.children[1].children[0];

        const id = e.target.id;
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

        const response = await fetch(url);
        const data = await response.json();

        const hidden = e.target.textContent === 'More';

        extra.style.display = hidden ? 'block' : 'none';
        e.target.textContent = hidden ? 'Less' : 'More';
        p.textContent = data.content;
    }

    function createElement(type, content, attributes = []) {

        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1]);
            }
        }
        return element;
    }
}

solution();