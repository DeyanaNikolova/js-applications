const tbody = document.querySelector('tbody');
const createForm = document.getElementById('createForm');
const editForm = document.getElementById('editForm');


document.getElementById('loadBooks').addEventListener('click', loadBooks);
createForm.addEventListener('submit', onCreate); 
editForm.addEventListener('submit', onEditSubmit)
tbody.addEventListener('click', onTableClick);

loadBooks();

async function onEditSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

   const result = await editBook(id, { author, title }); 
  
   ev.target.reset();
   createForm.style.display = 'block';
   editForm.style.display = 'none';

   loadBooks();
}

 function onTableClick(ev) {
    if(ev.target.className == 'delete'){
        onDelete(ev.target);
    }else if(ev.target.className == 'edit'){
       onEdit(ev.target);
    }
}

async function onDelete(button) {
   const id = button.parentElement.dataset.id;
   await deleteBook(id);
   button.parentElement.parentElement.remove();
}

async function onEdit(button) {
    const id = button.parentElement.dataset.id;
    const book = await loadBookById(id);

   createForm.style.display = 'none';
   editForm.style.display = 'block';

   editForm.querySelector('[name="author"]').value = book.author;
   editForm.querySelector('[name="title"]').value = book.title;
   editForm.querySelector('[name="id"]').value = id;
}


async function onCreate(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const author = formData.get('author');
    const title = formData.get('title');

   const result = await createBook({ author, title }); 
   tbody.appendChild(createRow(result.id, result));
   ev.target.reset();
}

// GET request
async function loadBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
   const result = Object.entries(books).map(([id, book])=> createRow(id, book));
    tbody.replaceChildren(... result);   
}

async function loadBookById(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    return book;
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${id}>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>`;

    return row
}

// POST request
async function createBook(book) {
    const result =  await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify(book)
    });
    return result;
}

// PUT request
async function editBook(id, book) {
    const result =  await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book)
    });
    return result;
}

// DELETE request
async function deleteBook(id) {
    const result =  await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    return result;
}

async function  request(url, options) {

    if(options && options.body != undefined){
         Object.assign(options, {  
            headers: {
            'Content-Type': 'application/json'
         }
      });
    }
    const response = await fetch(url, options);

    if(response.ok != true){
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}
 







// function solve() {

//     const url = `http://localhost:3030/jsonstore/collections/books`;

//     document.getElementById('loadBooks').addEventListener('click', loadBooks);

//     const table = document.getElementsByTagName('tbody')[0];

//     async function loadBooks() {
//        // table.innerHTML = '';
//         const res = await fetch(url);
//         const data = await res.json();

//         Object.values(data).forEach(b => {

//             const tr = document.createElement('tr');
//             tr.setAttribute('id', b._id)

//             const titleCell = tr.insertCell(0);
//             titleCell.innerText = b.title;

//             const authorCell = tr.insertCell(1);
//             authorCell.innerText = b.author;

//             const actionCell = tr.insertCell(2);
//             const editBtn = document.createElement('button');
//             editBtn.innerText = 'Edit';
//             editBtn.addEventListener('click', editBook);

//             const dleteBtn = document.createElement('button');
//             dleteBtn.innerText = 'Delete';
//             dleteBtn.addEventListener('click', deleteBook);
//             actionCell.appendChild(editBtn);
//             actionCell.appendChild(dleteBtn);

//             table.appendChild(tr);

//         });
//     }

//     const titleInputEl = document.getElementsByName('title')[0];
//     const authorInputEl = document.getElementsByName('author')[0];
//     const submitBtn = document.querySelector('form button');

//    if(submitBtn.textContent == 'Submit'){
//     submitBtn.addEventListener('click', addBook);
//    } else {
//     submitBtn.addEventListener('click', editBook);
//    }
   

//     async function addBook(ev) {
//         ev.preventDefault();

//         if (titleInputEl.value !== '' && authorInputEl.value !== '' && submitBtn.textContent == 'Submit') {
//             const res = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     author: authorInputEl.value,
//                     title: titleInputEl.value
//                 })
//             });

//             const tr = document.createElement('tr');

//             const titleCell = tr.insertCell(0);
//             titleCell.innerText = titleInputEl.value;

//             const authorCell = tr.insertCell(1);
//             authorCell.innerText = authorInputEl.value;

//             const editBtn = document.createElement('button');
//             editBtn.innerText = 'Edit';
//             editBtn.setAttribute('id', 'editBtn');

//             const dleteBtn = document.createElement('button');
//             dleteBtn.innerText = 'Delete';
//             dleteBtn.setAttribute('id', 'deleteBtn')

//             tr.appendChild(editBtn);
//             tr.appendChild(dleteBtn);

//             table.appendChild(tr);

//             titleInputEl.value = '';
//             authorInputEl.value = '';
//         }
//     }
//     document.querySelector('#editBtn').addEventListener('click', editBook);
//     document.querySelector('#deleteBtn').addEventListener('click', deleteBook);

//     const formTitleEl = document.getElementsByTagName('h3')[0];

//    async function editBook(e) {
//         formTitleEl.innerText = 'Edit FORM';
//         submitBtn.innerText = 'Save';
//         const trEl = e.target.parentNode.parentNode;
   
//         titleInputEl.value = trEl.children[0].textContent;
//         authorInputEl.value = trEl.children[1].textContent;
//         trEl.remove();
    
//         const id = trEl.id;
//         const res = await fetch(`${url}/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 author: authorInputEl.value,
//                 title: titleInputEl.value
//             })
//         });
//     }

//     async function deleteBook(e) {
//         const trEl = e.target.parentNode.parentNode;
//         const id = trEl.id;
//         const res = await fetch(`${url}/${id}`, {
//             method: 'DELETE'
//         });
//         trEl.remove();
//     }
// }
// solve();