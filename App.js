import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Easing } from 'react-native';
import spinner from "./spinner.png"

let count = 0; 

export default function App() {
  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
      Animated.timing(rotateValueHolder, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        console.log("COUNT:", count);
        if (count < 7) {
          startImageRotateFunction()
        }
        if (count >= 7) {
          count = 0;
        }
        count = count + 1;
      });
  };

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
            <TouchableOpacity style={{transform: [{ rotate: RotateData }] }} title="spinner" onPress={startImageRotateFunction}>
              <ImageBackground source={spinner} style={styles.image} resizeMode='contain'/>
            </TouchableOpacity >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    width: 350,
    height: 350,
  },
});
