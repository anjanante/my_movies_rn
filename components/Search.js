// Components/Search.js
import React from 'react'
import { StyleSheet, View, TextInput, Button, Text,FlatList } from 'react-native'
import {data} from '../Helpers/filmsData'

export default class Search extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.textinput} placeholder='Title of the movie' />
                <Button title='Search' onPress={() => { }} />
                <FlatList
                    data={data}
                    renderItem={({item}) => <Text>{item.name}</Text>}
                    keyExtractor={item => item.name}
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