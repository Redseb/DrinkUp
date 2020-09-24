import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
  repeat,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');
const CARD_HEIGHT = height / 1.3;
const CARD_WIDTH = width / 1.15;

const Card = ({emoji, title, desc, type, style, player}) => {
  const text = [];
  const splitDesc = desc.split('[Random Player]');

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject, style]}>
      <View style={styles.titleContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      {desc.includes('[Random Player]') ? (
        <Text style={styles.desc}>
          {splitDesc[0]}
          <Text style={[styles.desc, {color: 'red'}]}>
            {player !== undefined
              ? player.name !== ''
                ? player.name
                : 'The Player Reading This'
              : 'The Player Reading This'}
          </Text>
          {splitDesc[1]}
        </Text>
      ) : (
        <Text style={styles.desc}>{splitDesc[0]}</Text>
      )}

      <View style={styles.logoContainer}>
        {/* <Text
          style={[
            styles.logo,
            {marginBottom: height / 150, fontSize: height / 20},
          ]}>
          🍻
        </Text> */}
        <Icon
          style={{alignSelf: 'center'}}
          name="beer-outline"
          size={height / 20}
          color="#FDD451"
        />

        <Text style={styles.logo}>Drink Up! </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    marginVertical: (height - CARD_HEIGHT) / 2,
    marginHorizontal: (width - CARD_WIDTH) / 2,
    backgroundColor: '#303030',
    borderRadius: 10,
    borderColor: '#FDD451',
    borderWidth: 2,
    elevation: 10,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FDD451',
    borderRadius: 10,
    marginHorizontal: width / 20,
    marginTop: height / 40,
    padding: height / 150,
  },
  emoji: {
    fontSize: height / 24,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: height / 24,
    fontFamily: 'FjallaOne',
    color: '#303030',
    width: width / 2,
  },
  desc: {
    textAlign: 'center',
    fontSize: height / 22,
    fontFamily: 'FjallaOne',
    color: '#FDD451',
    paddingHorizontal: (width - CARD_WIDTH) / 4,
  },
  logoContainer: {
    marginBottom: height / 40,
  },
  logo: {
    fontSize: height / 40,
    fontFamily: 'FjallaOne',
    color: '#FDD451',
    textAlign: 'center',
  },
});

export default Card;
