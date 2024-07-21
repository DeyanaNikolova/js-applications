import * as api from './api.js';


export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllProducts() {
    return api.get('/data/products?sortBy=_createdOn%20desc');
}

export async function getProductById(id) {
    return api.get('/data/products/' + id);
}

// export async function buyProduct(product) {
//     return api.post('/data/bought');
// }

export async function createProduct(product) {
    return api.post('/data/products', product);
}

export async function editProduct(id, product) {
    return api.put('/data/products/' + id, product);
}

export async function deleteProduct(id) {
    return api.del('/data/products/' + id);
}