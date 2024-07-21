

export const albumIsInvalid = (albumData) => {
    const requredFields = [
        'name',
        'imgUrl',
        'price',
        'releaseDate',
        'artist',
        'genre',
        'description'
    ];
    return requredFields.some(x => !albumData[x]);
};
