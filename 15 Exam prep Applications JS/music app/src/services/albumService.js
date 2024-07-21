import * as request from './requester.js';

const basedUrl = 'http://localhost:3030';

export const getAll = () => request.get(`${basedUrl}/data/albums?sortBy=_createdOn%20desc&distinct=name`);

export const create = (albumData) => request.post(`${basedUrl}/data/albums`, albumData);

export const getAlbumById = (albumId) => request.get(`${basedUrl}/data/albums/${albumId}`);

export const edit = (id, albumData) => request.put(`${basedUrl}/data/albums/${id}`, albumData);

export const remove = (id) => request.del(`${basedUrl}/data/albums/${id}`);

export const search = (searchText) => {
    const query = encodeURIComponent(`name LIKE "${searchText}"`);

    return request.get(`${basedUrl}/data/albums?where=${query}`);
};