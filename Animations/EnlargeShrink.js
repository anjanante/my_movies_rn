// Animations/EnlargeShrink.js

import React from 'react'
import { StyleSheet, Animated } from 'react-native'

class EnlargeShrink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteWidth: new Animated.Value(this._getSize()),
      favoriteHeight: new Animated.Value(this._getSize()),
    }
  }

  _getSize(){
    const shouldEnlarge = this.props.shouldEnlarge;
    if (shouldEnlarge) {
      return 80;
    }
    return 40
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
    Animated.parallel([
      Animated.spring(
        this.state.favoriteWidth,
        {
          toValue: this._getSize()
        }
      ),
      Animated.spring(
        this.state.favoriteHeight,
        {
          toValue: this._getSize()
        }
      )
    ]).start()
  }


  render() {
    return (
      <Animated.View style={{ padding: 2, width: this.state.favoriteWidth, height: this.state.favoriteHeight }}>
        {this.props.children}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
})

export default EnlargeShrink
