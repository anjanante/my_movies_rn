const initialState = { favoritesFilm : []}
function toogleFavorite(state = initialState, action){
    let nextState;
    switch (action.type) {
        case 'TOOGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id);
            if(favoriteFilmIndex !== -1){
                //delete film
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((item,index) => index != favoriteFilmIndex)
                }
            }else{
                //add film
                nextState = {
                    ...state,
                    favoritesFilm : [...state.favoritesFilm,action.value]
                }
            }
            
            return nextState || state;
    
        default:
            return state;
    }
}

export default toogleFavorite;
