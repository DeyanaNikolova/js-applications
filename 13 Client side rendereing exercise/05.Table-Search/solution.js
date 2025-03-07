import { html, render } from './node_modules/lit-html/lit-html.js';

const tbody = document.querySelector('tbody');

const rowTemplate = (student) => html`
 <tr class=${student.match ? 'select' : ''}>
   <th>${student.item.firstName} ${student.item.lastName}</th>
   <th>${student.item.email}</th>
   <th>${student.item.course}</th>
</tr>`;


const input = document.getElementById('searchField');
document.getElementById('searchBtn').addEventListener('click', onSearch);

let students;
start();

async function start() {
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   students = Object.values(data).map(s => ({ item: s, match: false }));
  // students.forEach(s => s.match = false);

   update();
}

function update() {
   render(students.map(rowTemplate), tbody);  
}

function onSearch() {
   const value = input.value.trim().toLocaleLowerCase();

   for(let student of students){
      student.match = Object.values(student.item)
      .some(v => value && v.toLocaleLowerCase()
      .includes(value));
   }
   update();
}