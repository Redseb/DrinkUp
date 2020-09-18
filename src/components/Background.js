import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
  repeat,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

const Background = () => {
  const yTranslation = useSharedValue(0);

  const stripeAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: repeat(
            withTiming(yTranslation.value, {
              duration: 7000,
              easing: Easing.in,
            }),
            -1,
            true,
          ),
        },
      ],
    };
  });

  useEffect(() => {
    yTranslation.value = height / 27;
  }, []);

  return (
    <Animated.View style={[styles.container, stripeAnimationStyle]}>
      <View style={styles.blackStripe} />
      <View style={styles.yellowStripe} />
      <View style={styles.blackStripe} />
      <View style={styles.yellowStripe} />
      <View style={styles.blackStripe} />
      <View style={styles.yellowStripe} />
      <View style={styles.blackStripe} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  blackStripe: {
    height: height / 5,
    width: width * 2,
    backgroundColor: '#303030',
    transform: [{rotateZ: '35deg'}, {translateX: -height / 3}],
  },
  yellowStripe: {
    height: height / 5,
    width: width * 2,
    backgroundColor: '#FDD451',
    transform: [{rotateZ: '35deg'}, {translateX: -height / 3}],
  },
});

export default Background;
