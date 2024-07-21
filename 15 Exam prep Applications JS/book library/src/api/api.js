import { getUserData, setUserData, clearUserData } from '../util.js';

const host = 'http://localhost:3030';


async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status == 204){
            return response;
        }else{
            return response.json();
        }     

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', body) {
    const options = {
        method,
        headers: {},
        body: JSON.stringify(body)
    }
    const user = getUserData();
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }
    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }
    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password });

    setUserData(result);
    return result;
}

export async function register(email, password) {
    const result = await post('/users/register', { email, password });

    setUserData(result);
  
    return result;
}

export function logout() {
    get('/users/logout');
    clearUserData();
}