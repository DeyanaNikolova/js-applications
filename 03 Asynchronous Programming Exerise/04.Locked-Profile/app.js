function lockedProfile() {

    let url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const main = document.getElementById('main');
    const button = document.querySelector('button');
    button.addEventListener('click', addDetails);
    const inputName = document.querySelector('[user1Username]');
    const inputEmail = document.querySelector('[user1Email]');
    const inputAge = document.querySelector('[user1Age]');

async function addDetails(e) {
    
    const response = await fetch(url);
    const data = await response.json();
  

    Object.values(data).forEach(d =>{
        console.log(d.username);
        inputName.style.diplay = 'enabled'
    inputName.value = d.username;
    inputEmail.value = d.email;
    inputAge.value = d.age;

    });
}
}



// const divProfile = createElement('div', '', ['class', 'profile']);
// const img = createElement('img', '', ['src', './iconProfile2.png', 'class', 'userIcon']);
// const labelLock = createElement('label', 'Lock');
// const inputLocked = createElement('input', '', ['type', 'radio', 'name', 'user1Locked', 'value', 'lock']);
// const labelUnlock = createElement('label', 'Unlock');
// const inputUnlock = createElement('input', 'Unlock', ['type', 'radio', 'name', 'user1Locked', 'value', 'unlock']);
// const br = createElement('br');
// const hr = createElement('hr');
// const lableUsername = createElement('label', 'Username');
// const inputName = createElement('input', '', ['type', 'text', 'name', 'user1Username', 'value', `${d.username}`]);
// const divHidden = createElement('div', '', ['id', 'user1HiddenFields']);
// const hr2 = createElement('hr');
// const labelEmail = createElement('label', 'Email:');
// const inputEmail = createElement('input', ['type', 'email', 'name', 'user1Email', 'value', `${d.email}`]);
// const labelAge = createElement('label', 'Age:');
// const inputAge = createElement('input', '', ['type', 'email', 'name', 'user1Age', 'value', `${d.age}`])
// const button = createElement('button', 'Show more');

// divProfile.appendChild(img);
// divProfile.appendChild(labelLock);
// divProfile.appendChild(inputLocked);
// divProfile.appendChild(labelUnlock)
// divProfile.appendChild(inputUnlock);
// divProfile.appendChild(br);
// divProfile.appendChild(hr);
// divProfile.appendChild(lableUsername);
// divProfile.appendChild(inputName);


// divHidden.appendChild(hr2);
// divHidden.appendChild(labelEmail);
// divHidden.appendChild(inputEmail);
// divHidden.appendChild(labelAge);
// divHidden.appendChild(inputAge);

// divProfile.appendChild(divProfile);
// divHidden.appendChild(button);

// main.appendChild(divProfile);