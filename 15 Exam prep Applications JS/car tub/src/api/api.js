import { getUserData, setUserData, clearUserData } from '../util.js';

const host = 'http://localhost:3030';
export const settings = {
    host: host
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok == false) {
            const error = response.json();
            throw new Error(error.message);   
        }
       
        try{
            const data = await response.json();
            return data;
        }catch(err){
            return response;
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
    if(user){
        options.headers['X-Authorization'] = user.accessToken;
    }
    if(body){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }
    return options;
}

export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return await request(url, createOptions('post', data));
}

export async function put(url, data) {
    return await request(url, createOptions('put', data));
}

export async function del(url) {
    return await request(url, createOptions('delete'));
}

export async function login(username, password) {
    const result = await post(settings.host + '/users/login', {username, password});
    setUserData(result);
    return result;
}

export async function register(username, password) {
    const result = await post(settings.host + '/users/register', {username, password});
    setUserData(result);
    return result;
}

export function logout() {
    get(settings.host + '/users/logout');
    clearUserData(); 
}