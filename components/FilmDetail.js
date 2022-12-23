import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import React from 'react';
import { getFilmDetailFromApi } from "../API/TMDBApi";

export default class FilmDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: true,
        }
        this.searchedText = ''
    }

    _loadDetailFilms(idFilm) {
        getFilmDetailFromApi(idFilm)
            .then(res => {
                console.log(res);
                this.setState({ 
                    film: res,
                    isLoading: false 
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    _displayFilm(){
        const film = this.state.film;
        if(film != undefined){
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Text>{film.title}</Text>
                </ScrollView>
            )
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

    componentDidMount(){
        console.log('componentDidMount');
        this._loadDetailFilms(this.props.navigation.state.params.idFilm);
    }

    render() {
        console.log('RENDER');
        const idFilm = this.props.navigation.state.params.idFilm;
        return (
            <View>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    scrollview_container: {
        flex: 1,
    },
    loading_container: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})