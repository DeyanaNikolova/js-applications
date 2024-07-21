const url = `http://localhost:3030/jsonstore/messenger`;
const messages = document.getElementById('messages');

function attachEvents() {

    document.getElementById('submit').addEventListener('click', postMessage);
    document.getElementById('refresh').addEventListener('click', loadAllMessages);

}

async function loadAllMessages() {
    // GET request
    const response = await fetch(url);
    const data = await response.json();

    messages.value = Object.values(data).map(({ author, content }) => `${author}: ${content}`).join('\n');
}

async function postMessage() {
    const [author, content] = [document.getElementById('authorName'), document.getElementById('message')];

    if (author.value !== '' || content.value !== '') {
        // post request s options aothor and content using  function 'request'
        await request(url, { author: author.value, content: content.value });
        author.value = '';
        content.value = '';
    }
}
// POST request function
async function request(url, options) {

    if (options) {
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        };
    }
    const res = await fetch(url, options);
    return res.json();
}

// let url = 'http://localhost:3030/jsonstore/messenger';

// function onComent() {
//  let authorName = document.querySelector('[name="author"]');
//  let content = document.querySelector('[name="content"]');

//  if(!authorName.value || !content.valie){
//     return
//  }
//  fetch(url, {
//     method: 'POST',
//     headers: { 'Contemt-type': 'application/json'},
//     body: JSON.stringify({
//         author: authorName.value.trim(),
//         content: content.value.trim()
//     })
//  })
//  .then(response =>{
//     if (response.ok == false) {
//         throw new Error('Error creating new record');
//     }
//     return response.json();
//  })
//  .catch(err => alert(err))

//  authorName.value = '';
//  content.value = '';
//  onRefresh();
// }

// function onRefresh() {
//     fetch(url)
//         .then(response => {
//             if (response.ok == false) {
//                 throw new Error('Error');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const messagesElement = document.querySelector('#messages');
//             let coments = [];
//             Object.values(data).forEach(u => coments.push(`${u.author}: ${u.content}`));
//             messagesElement.value = coments.join('\n');
//         })
//         .catch(err => alert(err))
// }

attachEvents();