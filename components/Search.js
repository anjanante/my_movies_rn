// Components/Search.js
import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
// import { data } from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromtext } from '../API/TMDBApi'
import { connect } from "react-redux";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.page = 0
        this.totalPage = 0
        this.state = {
            films: [],
            isLoading: false,
        }
        this.searchedText = ''
    }
    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromtext(this.searchedText, this.page + 1)
                .then(res => {
                    console.log(res)
                    this.page = res.page;
                    this.totalPage = res.total_pages;
                    this.setState({
                        films: [...this.state.films, ...res.results],
                        isLoading: false,
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _searchTextInputchanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0
        this.totalPage = 0
        this.setState({
            films: [],
        }, () => this._loadFilms())
    }

    _displayDetailForFilm = (id) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: id });
    }

    componentDidUpdate() {
        console.log(this.props.favoriteFilm);
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput onChangeText={(text) => this._searchTextInputchanged(text)} onSubmitEditing={() => this._searchFilms()} style={styles.textinput} placeholder='Title of the movie' />
                <Button title='Search' onPress={() => this._searchFilms()} />
                <FlatList
                    data={this.state.films}
                    // extraData={this.props.favoriteFilm} //with or not, is the same on v17
                    renderItem={({ item }) =>
                        <FilmItem
                            film={item}
                            isFilmFavorite={(this.props.favoriteFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                            displayDetailForFilm={this._displayDetailForFilm}
                        />}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (this.page < this.totalPage) {
                            this._loadFilms()
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignContent: 'center',//align x
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        favoriteFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Search)