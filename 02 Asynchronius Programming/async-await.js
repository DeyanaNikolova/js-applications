const baseUrl = 'https://swapi.dev/api/people';


// function decoration

async function getStarwarsCharacter(id) {
    try {
        let res = await fetch(`${baseUrl}/${id}`);
        let character = await res.json();
        return character;
    }
    catch (err) {
        console.log(err);
    }
}




//  function expression
// const getStarwarsCharacter = async function () {
// }

// arrow function
// const getStarwarsCharacter = async ()=>{
// }

