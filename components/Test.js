// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, Animated, Easing, Dimensions, PanResponder } from 'react-native'
import Hello from './Hello' //chose the right component according to the platform

class Test extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      topPosition: new Animated.Value(0),
      leftPosition: new Animated.Value(0),
      // topPosition: 0,
      // leftPosition: 0,
      favoriteWidth: new Animated.Value(100),
    }

    //check movement of finger
    var {height, width} = Dimensions.get('window');
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            let touches = evt.nativeEvent.touches;
            if (touches.length == 1) {//check one finger
                this.setState({
                  topPosition: touches[0].pageY - height/2,
                  leftPosition: touches[0].pageX - width/2
                })
            }
        }
    })
  }

  componentDidMount(){
    // //depending of duration
    // Animated.timing(
    //   this.state.topPosition,
    //   {
    //     toValue: 100,
    //     duration: 3000
    //   }
    // ).start()
    // //depending of elasticity
    // Animated.spring(
    //   this.state.topPosition,
    //   {
    //     toValue: 100,
    //     speed: 4,
    //     bounciness:30 
    //   }
    // ).start()
    
    //launch parallel animation
    Animated.parallel([
      Animated.spring(
        this.state.topPosition,
        {
          toValue: 100,
          tension: 8,
          friction: 3
        }
      ),
      Animated.timing(
        this.state.leftPosition,
        {
          toValue: 100,
          duration: 1000,
          easing: Easing.elastic(2)
        }
      ),
      Animated.timing(
        this.state.favoriteWidth,
        {
          toValue: 200,
          duration: 500
        }
      )
    ]).start()
  }

  render() {
    return (
      <View style={styles.main_container}>
        {/* <View style={styles.subview_container}>
            <Hello />
        </View> */}
        {/* View for Animated */}
        <Animated.View style={[styles.subview_container, {top: this.state.topPosition,left: this.state.leftPosition,width:this.state.favoriteWidth}]}>
        </Animated.View>
        {/* View for touch event in screen */}
        {/* <View
          {...this.panResponder.panHandlers}
          style={[styles.subview_container, { top: this.state.topPosition, left: this.state.leftPosition }]}>
        </View> */}
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
    width: 100,
    height:100
  }
})

export default Test