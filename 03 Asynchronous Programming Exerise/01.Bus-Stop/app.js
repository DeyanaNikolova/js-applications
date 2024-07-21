// function getInfo() {
//     let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
//     let inputElement = document.getElementById('stopId');
//     let ulElement = document.getElementById('buses');
//     let divElement = document.getElementById('stopName');

//     fetch(`${baseUrl}/${inputElement.value}`)
//         .then(responce => {
//             if (responce !== 200) {
//                 throw new Error('Stop ID not found');
//             }
//             return responce.json();
//         })
//         .then(data => {
//             let buses = data.buses;
//             let name = data.name;

//             divElement.textContent = name;
//             ulElement.innerHTML = '';
//             Object.keys(buses).forEach(bus => {
//                 let liElement = document.createElement('li');
//                 liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
//                 ulElement.appendChild(liElement);
//             })
//         })
//         .catch(error => {
//             divElement.textContent = 'Error';
//             ulElement.innerHTML = '';
//         })
//     inputElement.value = '';
// }

async function getInfo() {

    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    const stopNameEl = document.getElementById('stopName');
    const busesEl = document.getElementById('buses');

    try {
        stopNameEl.textContent = 'Loading...';
        busesEl.replaceChildren();
        const res = await fetch(url);

        if (res.status !== 200) {
            throw new Error('Stop ID not found!');
        }
        const data = await res.json();
        stopNameEl.textContent = data.name;

        Object.entries(data.buses).forEach(bus => {
            const liEl = document.createElement('li');
            liEl.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            busesEl.appendChild(liEl);
        });
    }
    catch (error) {
        stopNameEl.textContent = 'Error';
        busesEl.textContent = '';
    }
}




