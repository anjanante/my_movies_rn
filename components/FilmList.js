// Components/Search.js
import React from 'react'
import { StyleSheet, FlatList} from 'react-native'
// import { data } from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { connect } from "react-redux";

class FilmList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
        }
    }
    
    _displayDetailForFilm = (id) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: id });
    }


    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                // extraData={this.props.favoriteFilm} //with or not, is the same on v17
                renderItem={({ item }) =>
                    <FilmItem
                        film={item}
                        isFilmFavorite={(this.props.favoriteFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailForFilm={this._displayDetailForFilm}
                    />}
                keyExtractor={item => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    console.log("Tratra ftsn");
                    console.log(this.props.page);
                    console.log(this.props.totalPage);

                    if (this.props.page < this.props.totalPage) {
                        console.log("Tratra le pejy");
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
})

const mapStateToProps = (state) => {
    return {
        favoriteFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmList)