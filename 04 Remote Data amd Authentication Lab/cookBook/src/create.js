document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');
    
    const recipe ={
        name,
        img,
        ingredients,
        steps
    };
    const token = sessionStorage.getItem('accessToken');
    if(token == null){
        alert('Please login!');
        window.location = '/login.html';
        return
    }

    try {
      
        const response = await fetch('thhp://localhost:3030/data/recipes', {
            method: 'post',
            headers: { 
                'Content-Type': 'applocation/json',
                'X-Authorization': token
        },
            body: JSON.stringify(recipe)
        });


        if(response.ok == false){
            const error = await response.json();
            throw new Error(error.message);
        }

        //const data = await response.json();
        window.location = '/index.html';
        
    } catch (err) {
        alert(err.message);
    }
}