const API_TOKEN = 'b6a26b947acac2f784a8a7f07df1775a';

export function getFilmsFromtext(text){
    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+API_TOKEN+'&query='+text;
    console.log(url);
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300'+ name;
}