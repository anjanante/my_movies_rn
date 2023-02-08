import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect } from "react-redux";
import FilmList from './FilmList';

class Favorites extends React.Component {
    render(){
        return (
            <FilmList 
                    films={this.props.favoriteFilm}
                    navigation={this.props.navigation}
                    page={1}
                    totalPage={1}
                />  
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoriteFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Favorites)