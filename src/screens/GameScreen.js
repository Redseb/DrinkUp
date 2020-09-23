import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//TinderSwipe
import {useMemoOne} from 'use-memo-one';
import Animated, {
  Value,
  interpolateNode,
  concat,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Swipeable from '../components/Swipeable';

const {width, height} = Dimensions.get('window');

//Components
import Card from '../components/Card';
//Utils
import {initDeck, shuffle, nextCard} from '../util/card-supplier';
import {RectButton} from 'react-native-gesture-handler';

//Tinder Swipe
const deltaX = width / 2;
const α = Math.PI / 12;
const A = Math.round(width * Math.cos(α) + height * Math.sin(α));
const snapPointsX = [-A, 0, A];
const snapPointsY = [-A * 3, 0, A * 2]; // Disables sliding up so the flicker bug doesnt appear

const GameScreen = ({players, setPlayers, setInGame}) => {
  const [deck, setDeck] = useState(() => initDeck());
  const [currCardIndex, setCurrCardIndex] = useState(0);
  const slideUpY = useSharedValue(height);
  const slideUpAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: slideUpY.value,
        },
      ],
    };
  });

  //TinderSwipe
  const {x, y, offsetX, offsetY} = useMemoOne(
    () => ({
      x: new Value(0),
      y: new Value(0),
      offsetX: new Value(0),
      offsetY: new Value(0),
    }),
    [],
  );
  useEffect(() => {
    slideUpY.value = withSpring(0, {damping: 20});
  }, [currCardIndex]);

  const onSnap = useMemoOne(
    () => ([point]) => {
      if (point !== 0) {
        slideUpY.value = height;

        offsetX.setValue(0);
        x.setValue(0);
        offsetY.setValue(0);
        y.setValue(0);
        setCurrCardIndex((currCardIndex + 1) % deck.length);
      }
    },
    [currCardIndex, offsetX, offsetY, deck.length],
  );
  const rotateZ = concat(
    interpolateNode(x, {
      inputRange: [-1 * deltaX, deltaX],
      outputRange: [α, -1 * α],
      extrapolate: Extrapolate.CLAMP,
    }),
    'rad',
  );
  const translateX = x;
  const translateY = y;
  // End Tinder Swipe
  // Handle back button physical or digital
  const onBack = () => {
    setTimeout(() => {
      slideUpY.value = withSpring(height, {damping: 20});
      setTimeout(() => setInGame(false), 300);
    }, 200);
  };
  // Set up BackHandler to go back to title screen when pressing back button (ANDROID)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onBack();
        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <View style={[styles.backButtonContainer, StyleSheet.absoluteFillObject]}>
        <RectButton onPress={onBack}>
          <Icon name="arrow-back" size={height / 18} color="#FDD451" />
        </RectButton>
      </View>
      <Animated.View style={[slideUpAnim, StyleSheet.absoluteFillObject]}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{translateX}, {translateY}, {rotateZ}],
          }}>
          <Card
            emoji={deck[currCardIndex].emoji}
            title={deck[currCardIndex].title}
            desc={deck[currCardIndex].desc}
            type={deck[currCardIndex].type}
            player={players[currCardIndex % players.length]}
          />
        </Animated.View>
      </Animated.View>

      <Swipeable
        key={currCardIndex}
        // {...{snapPointsX, onSnap, x, y, offsetX}}

        {...{snapPointsX, snapPointsY, onSnap, x, y, offsetX, offsetY}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303030',
    width: height / 18,
    height: height / 18,
    marginTop: height / 20,
    marginLeft: width / 30,
    borderRadius: 10,
    elevation: 5,
  },
});

export default GameScreen;
