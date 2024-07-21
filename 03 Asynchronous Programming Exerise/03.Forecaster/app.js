// function attachEvents() {
//     let inputElement = document.getElementById('location');
//     let getBtn = document.getElementById('submit');
//     let divDisplay = document.getElementById('forecast');
//     let currentDiv = document.getElementById('current');
//     let upcomingDiv = document.getElementById('upcoming');
//     let baseUrl = 'http://localhost:3030/jsonstore/forecaster';

//     let sunny = '&#x2600';
//     let partlySunny = '&#x26C5';
//     let overcast = '&#x2601';
//     let rain = '&#x2614';
//     let degrees = '&#176';

//     let code = '';

//     let divElementUpcoming = document.createElement('div');
//     let divElementCurrent = document.createElement('div');
//     getBtn.addEventListener('click', (e) =>{
//         divElementUpcoming.innerHTML = '';
//         divElementCurrent.innerHTML = '';

//         divElementUpcoming.setAttribute('class', 'forecast-info');
//         divElementCurrent.setAttribute('class', 'forecasts');
//         divDisplay.style.display = 'inline';

//         fetch(`${baseUrl}/locations`)
//         .then(responce => responce.json())
//         .then(data =>{
//            data.forEach(locationInfoObj => {

//             if(locationInfoObj.name == inputElement.value){
//                 return code = locationInfoObj.code;
//             }
//            }); 
//            fetch(`${baseUrl}/today/${code}`)
//            .then(responce => responce.json())
//            .then(data=>{
//                 let spanGroup = document.createElement('span');
//                 let conditionSpan = document.createElement('span');
//                 let temperatureSpan = document.createElement('span');
//                 let locationSpan = document.createElement('span');
//                 let spanIcon = document.createElement('span');

//                 spanIcon.setAttribute('class', 'condition symbol');
//                 spanGroup.setAttribute('class', 'condition');
//                 locationSpan.setAttribute('class', 'forecast-data');
//                 conditionSpan.setAttribute('class', 'forecast-data');
//                 temperatureSpan.setAttribute('class', 'forecast-data');

//                 locationSpan.textContent = data.name;
//                 temperatureSpan.innerHTML = `${data.forecast.low}${degrees}/${data.forecast.high}${degrees}`;
//                 conditionSpan.textContent = data.forecast.condition;
//                 let condition = data.forecast.condition;
//                 if(condition == 'Sunny'){
//                     spanIcon.innerHTML = sunny;
//                 }else if(condition == 'Partly sunny'){
//                     spanIcon.innerHTML = partlySunny;
//                 }else if(condition == 'Overcast'){
//                     spanIcon.innerHTML = overcast;
//                 }else if(condition == 'Rain'){
//                     spanIcon.innerHTML = rain;
//                 }
//                 spanGroup.appendChild(locationSpan);
//                 spanGroup.appendChild(temperatureSpan);
//                 spanGroup.appendChild(conditionSpan);

//                 divElementCurrent.append(spanIcon);
//                 divElementCurrent.appendChild(spanGroup);
//                 currentDiv.appendChild(divElementCurrent);
//            })
//            .catch(error => console.log('error'))

//            fetch(`${baseUrl}/upcoming/${code}`)
//            .then(responce => responce.json())
//            .then(data =>{

//             let nextDays = data.forecast;
//             nextDays.forEach(x =>{
//                 let spanGroup = document.createElement('span');
//                 let conditionSpan = document.createElement('span');
//                 let temperatureSpan = document.createElement('span');
//                 let spanIcon = document.createElement('span');
//                 let locationSpan = document.createElement('span');

//                 spanIcon.setAttribute('class', 'symbol');
//                 spanGroup.setAttribute('class', 'upcoming');
//                 conditionSpan.setAttribute('class', 'forecast-data');
//                 temperatureSpan.setAttribute('class', 'forecast-data');

//                 locationSpan.textContent = x.name;
//                 temperatureSpan.innerHTML = `${x.low}${degrees}/${x.high}${degrees}`;
//                 conditionSpan.textContent = x.condition;

//                 let condition = x.condition;

//                 if(condition == 'Sunny'){
//                     spanIcon.innerHTML = sunny;
//                 }else if(condition == 'Partly sunny'){
//                     spanIcon.innerHTML = partlySunny;
//                 }else if(condition == 'Overcast'){
//                     spanIcon.innerHTML = overcast;
//                 }else if(condition == 'Rain'){
//                     spanIcon.innerHTML = rain;
//                 }
//                 spanGroup.appendChild(locationSpan);
//                 spanGroup.appendChild(temperatureSpan);
//                 spanGroup.appendChild(conditionSpan);
//                 spanGroup.appendChild(spanIcon);

//                 divElementUpcoming.appendChild(spanGroup);
//                 upcomingDiv.appendChild(divElementUpcoming);
//             })
//            })
//         })
//     })
// }


function attachEvents() {

    let location = document.getElementById('location');
    let button = document.getElementById('submit');
    button.addEventListener('click', getWeather);

    const forecast = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');

    const baseUrl = 'http://localhost:3030/jsonstore/forecaster';

    let sunny = '&#x2600';
    let partlySunny = '&#x26C5';
    let overcast = '&#x2601';
    let rain = '&#x2614';
    let degrees = '&#176';

    let code = '';

    async function getWeather() {
        try {
            const response = await fetch(`${baseUrl}/locations`);
            const data = await response.json();

            data.forEach(x => {
                if (x.name == location.value) {
                    return code = x.code;
                }
            });

            const res = await fetch(`${baseUrl}/today/${code}`);
            const info = await res.json();
        
            forecast.style.display = 'block';

            const divForecasts = createElement('div', ['class', 'forecasts']);

            const spanSymbol = createElement('span', ['class', 'condition symbol']);
         
            let condition = info.forecast.condition;
            if (condition == 'Sunny') {
                spanSymbol.innerHTML = sunny;
            } else if (condition == 'Partly sunny') {
                spanSymbol.innerHTML = partlySunny;
            } else if (condition == 'Overcast') {
                spanSymbol.innerHTML = overcast;
            } else if (condition == 'Rain') {
                spanSymbol.innerHTML = rain;
            }
            const spanCondition = createElement('span', ['class', 'condition']);
           
            const spanName = createElement('span', ['class', 'forecast-data']);
            spanName.textContent = info.name;

            const spanDegree = createElement('span', ['class', 'forecast-data']);
            spanDegree.innerHTML = `${info.forecast.low}${degrees}/${info.forecast.high}${degrees}`;

            const spanWeather = createElement('span', ['class', 'forecast-data']);
            spanWeather.textContent = info.forecast.condition;

            spanCondition.appendChild(spanName);
            spanCondition.appendChild(spanDegree);
            spanCondition.appendChild(spanWeather);

            divForecasts.appendChild(spanSymbol);
            divForecasts.appendChild(spanCondition);
            current.appendChild(divForecasts);

            const upcomingResponse = await fetch(`${baseUrl}/upcoming/${code}`);
            const upcomInfo = await upcomingResponse.json();

            const div = createElement('div', ['class', 'forecast-info']);
       
            upcomInfo.forecast.forEach(x =>{
             
                const spanSymbol = createElement('span', ['class', 'symbol']);

                let condition = x.condition;
                if (condition == 'Sunny') {
                    spanSymbol.innerHTML = sunny;
                } else if (condition == 'Partly sunny') {
                    spanSymbol.innerHTML = partlySunny;
                } else if (condition == 'Overcast') {
                    spanSymbol.innerHTML = overcast;
                } else if (condition == 'Rain') {
                    spanSymbol.innerHTML = rain;
                } 

              const  spanUpcoming = createElement('span', ['class', 'upcoming']);

              const spanDegree = createElement('span', ['class', 'forecast-data']);
              spanDegree.innerHTML = `${x.low}${degrees}/${x.high}${degrees}`;

              const spanWeather = createElement('span', ['class', 'forecast-data']);
              spanWeather.textContent = x.condition;

              spanUpcoming.appendChild(spanSymbol);
              spanUpcoming.appendChild(spanDegree);
              spanUpcoming.appendChild(spanWeather);

              div.appendChild(spanUpcoming);
            });     
            upcoming.appendChild(div);
        }
        catch (error) {
            console.log('error');
        }

        function createElement(type, attributes = []) {
            let element = document.createElement(type);

            if(attributes.length > 0){
                for(let i = 0; i < attributes.length; i+=2){

                    element.setAttribute(attributes[i], attributes[i+1]);
                }
            }
            return element;
        }
    }
}
attachEvents();