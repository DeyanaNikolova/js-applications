import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll() {
    return api.get('/data/shoes?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return api.get('/data/shoes/' + id);
}

export async function createItem(item) {
    return api.post('/data/shoes', item);
}

export async function editItem(id, item) {
    return api.put('/data/shoes/' + id, item);
}

export async function deleteItem(id) {
    return api.del('/data/shoes/' + id);
}