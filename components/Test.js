// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import Hello from './Hello' //chose the right component according to the platform

class Test extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.subview_container}>
            <Hello />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    // ...Platform.select({
    //     ios:{
    //         backgroundColor: 'red',
    //     },
    //     android:{
    //         backgroundColor: 'blue',
    //     }
    // }),
    backgroundColor: Platform.OS === 'ios' ? 'red' : 'blue',
    color:'white',
    width: 50,
    height:50
  }
})

export default Test