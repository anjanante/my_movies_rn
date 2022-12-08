// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text,Image  } from 'react-native'

class FilmItem extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{uri: "image"}}
        />
        <View style={styles.content_container}>
            <View style={styles.header_container}>
                <Text style={styles.title_text}>{this.props.data.title}</Text>
                <Text style={styles.vote_text}>{this.props.data.vote_average}</Text>
            </View>
            <View style={styles.description_container}>
                <Text style={styles.description_text} numberOfLines={6}>{this.props.data.overview}</Text>
            </View>
            <View style={styles.date_container}>
                <Text style={styles.date_text}>Sortie le {this.props.data.release_date}</Text>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection:'row',
    borderBottomWidth:1,
  },
  image: {
    flex:1,
  },
  content_container: {
    flex:2,
    flexDirection:'column',
  },
  header_container: {
    flex:1,
    flexDirection:'row',
  },
  description_container: {
    flex:3,
  },
  date_container: {
    flex:1,
  },
  title_text: {
    flex:3,
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    flex:1,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default FilmItem