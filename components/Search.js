// Components/Search.js
import React from 'react'
import { StyleSheet, View, TextInput, Button, Text,FlatList } from 'react-native'
import {data} from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromtext } from '../API/TMDBApi'

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            films: [],
        }
        this.searchedText=''
    }
    _loadFilms(){
        if(this.searchedText.length>0){
            getFilmsFromtext(this.searchedText)
            .then(res => {
                console.log(res);
                this.setState({films: res.results})
            })
        }
    }

    _searchTextInputchanged(text){
        this.searchedText = text
    }

    render() {
        console.log('RENDER');
        return (
            <View style={styles.main_container}>
                <TextInput onChangeText={(text) => this._searchTextInputchanged(text)} onSubmitEditing={() => this._loadFilms()} style={styles.textinput} placeholder='Title of the movie' />
                <Button title='Search' onPress={() => this._loadFilms() } />
                <FlatList
                    data={this.state.films}
                    renderItem={({item}) => <FilmItem data={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex:1,
        marginTop: 20,
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
    }
})