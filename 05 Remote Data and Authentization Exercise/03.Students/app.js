async function solve() {

    const url = `http://localhost:3030/jsonstore/collections/students`;
    const table = document.querySelector('#result, tbody');

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(s => {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const facultyNumber = s.facultyNumber;
        const grade = Number(s.grade);

        const tr = document.createElement('tr');

        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastName;

        const facultyCell = tr.insertCell(2);
        facultyCell.innerText = facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = grade;

        table.appendChild(tr);
    });

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onClickSubmit);

    async function onClickSubmit(ev) {
        ev.preventDefault();

        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        if (isNaN(gradeInput.value)) {
            return alert('Wrong grade format!');
        }

        if (firstNameInput.value !== '' &&
            lastNameInput.value !== '' &&
            facultyNumberInput.value !== '' &&
            gradeInput.value !== '') {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    facultyNumber: facultyNumberInput.value,
                    grade: Number(gradeInput.value)
                })
            });
            const tr = document.createElement('tr');

            const firstNameCell = tr.insertCell(0);
            firstNameCell.innerText = firstNameInput.value;

            const lastNameCell = tr.insertCell(1);
            lastNameCell.innerText = lastNameInput.value;

            const facultyCell = tr.insertCell(2);
            facultyCell.innerText = facultyNumberInput.value;

            const gradeCell = tr.insertCell(3);
            gradeCell.innerText = gradeInput.value;

            table.appendChild(tr);
        }

        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }
}

// async function solve() {

//     const url = `http://localhost:3030/jsonstore/collections/students`;
//     const tBody = document.querySelector('#results tbody');

//     const res = await fetch(url);
//     const data = await res.json();

//     Object.values(data).forEach(s => {

//         const tr = document.createElement('tr');
//         tr.setAttribute('id', s._id);

//         const firstNameCell = tr.insertCell(0);
//         firstNameCell.innerHTML = s.firstName;

//         const lastNameCell = tr.insertCell(1);
//         lastNameCell.innerHTML = s.lastName;

//         const facNumberCell = tr.insertCell(2);
//         facNumberCell.innerHTML = s.facultyNumber;

//         const gradeCell = tr.insertCell(3);
//         gradeCell.innerHTML = Number(s.grade);

//         const delBtn = document.createElement('button');
//         delBtn.innerHTML = 'delete';
//         delBtn.style.width = '100%';
//         delBtn.style.color = 'red';
//         delBtn.addEventListener('click', onDelete);

//         const delBtnCell = tr.insertCell(4);
//         delBtnCell.appendChild(delBtn);
       
//         tBody.appendChild(tr);
//     });

//     async function onDelete(e) {
//         const id = e.target.parentNode.parentNode.id;
//         const res = await fetch(`${url}/${id}`,{ method: 'DELETE' });

//         e.target.parentNode.parentNode.remove();
//     }

//     document.getElementById('submit').addEventListener('click', addStudent);
//     const inputs = Array.from(document.querySelectorAll('.inputs input'));
   
//     async function addStudent(e) {
//         e.preventDefault();

//         const student = {
//             firstName: inputs[0].value,
//             lastName: inputs[1].value,
//             facultyNumber: Number(inputs[2].value),
//             grade: Number(inputs[3].value)
//         };

//         const res = await fetch(url, {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ student })
//         });

//         const data = await res.json();
    
//             const tr = document.createElement('tr');

//             const firstNameCell = tr.insertCell(0);
//             firstNameCell.innerHTML = inputs[0].value;

//             const lastNameCell = tr.insertCell(1);
//             lastNameCell.innerHTML = inputs[1].value;

//             const facNumberCell = tr.insertCell(2);
//             facNumberCell.innerHTML = inputs[2].value;

//             const gradeCell = tr.insertCell(3);
//             gradeCell.innerHTML = inputs[3].value;

//             tBody.appendChild(tr);

//             inputs.forEach(i => i.value = '');
//     }
// }
solve()
