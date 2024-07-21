import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.login;

const endpounts = {
    allMovies: '/data/movies',
    movieById: '/data/movies/'
};

export async function getAllMovies() {
    return api.get(endpounts.allMovies);
}

export async function getMovieById(id) {
    return api.get(endpounts.movieById + id);
}