// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
// import Hello from './Hello'//don't work in web dev //use and decomment this for specific dev according to the name of the files (.ios, .android)
// import Hello from './Hello.ios'
import Hello from './Hello.android' //comment this without the expo web

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