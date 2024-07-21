// function solve() {

//     let infoElement = document.querySelector('.info');
//     let departBtn = document.getElementById('depart');
//     let arriveBtn = document.getElementById('arrive');

//     let busStop = {
//         next: 'depot'
//     }


//     function depart() {
//         departBtn.disabled = true;
//         let url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`;

//         fetch(url)
//         .then(responce => responce.json())
//         .then(data => {
//             busStop = JSON.parse(JSON.stringify(data));
//             infoElement.textContent = `Next stop ${busStop.name}`
//         })
//         .catch(error => console.log('error'))
//         arriveBtn.disabled = false;
//     }

//     function arrive() {
//         infoElement.textContent = `Arriving at ${busStop.name}`;
//       departBtn.disabled = false;
//       arriveBtn.disabled = true;
//     }

//     return {
//         depart,
//         arrive
//     };
// }

// let result = solve();



function solve() {

    const lableEl = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    }

    async function depart() {
        departBtn.disabled = true;

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const res = await fetch(url);

        if(res.status !== 200){
            departBtn.disabled = true;
            arriveBtn.disabled = true;
            lableEl.textContent = 'Error!';
        }

        stop = await res.json();
        lableEl.textContent = `Next stop ${stop.name}`;

        arriveBtn.disabled = false;
    }

    function arrive() {

        lableEl.textContent = `Arriving at ${stop.name}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };

}

let result = solve();

