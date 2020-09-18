import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
  repeat,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

const Button = ({text, onPress, style}) => {
  return (
    <TouchableWithoutFeedback style={[styles.container]} onPress={onPress}>
      <Animated.View style={[style, styles.container]}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#303030',
    height: height / 7,
    borderColor: '#FDD451',
    borderWidth: 2,
    marginHorizontal: width / 20,
    alignContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    color: '#FDD451',
    textAlign: 'center',
    fontSize: height / 20,
    fontFamily: 'FjallaOne',
  },
});

export default Button;
