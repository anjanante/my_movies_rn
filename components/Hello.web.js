// Components/Test.js

import React from 'react'
import { StyleSheet, View } from 'react-native'

class Hello extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.subview_container}>
          Hello Web
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
    
  }
})

export default Hello