import { Text, View } from "react-native";
import React from 'react';

export default class FilmDetail extends React.Component {
    render() {
        const idFilm = this.props.navigation.state.params.idFilm;
        return (
            <View>
                <Text>FilmDetail {idFilm}</Text>
            </View>
        )
    }
}