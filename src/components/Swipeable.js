import * as React from 'react';
import {Dimensions} from 'react-native';
import {onGestureEvent} from 'react-native-redash/lib/module/v1';
import Animated, {Value, useCode, block, set} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import {withSpring} from '../util/animation-helpers';

const config = {
  speed: 200,
  bounciness: 0,
  damping: 10000,
  mass: 1,
  stiffness: 300,
  overshootClamping: false,
  restSpeedThreshold: 100000,
  restDisplacementThreshold: 1,
};

const {width, height} = Dimensions.get('screen');
const CARD_HEIGHT = height / 1.3;
const CARD_WIDTH = width / 1.15;

const Swipeable = ({
  x,
  y,
  offsetX,
  offsetY,
  snapPointsX,
  snapPointsY,
  onSnap,
}) => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    velocityX,
    translationX,
    translationY,
    state,
  });
  const translateX = withSpring({
    value: translationX,
    velocity: velocityX,
    offset: offsetX,
    state,
    snapPoints: snapPointsX,
    onSnap,
    config,
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    offset: offsetY || new Value(0),
    state,
    snapPoints: snapPointsY,
    onSnap,
    config,
  });
  useCode(() => block([set(x, translateX), set(y, translateY)]), [
    translateX,
    translateY,
    x,
    y,
  ]);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          height: CARD_HEIGHT,
          width: CARD_WIDTH,
          marginVertical: (height - CARD_HEIGHT) / 2,
          marginHorizontal: (width - CARD_WIDTH) / 2,
        }}
      />
    </PanGestureHandler>
  );
};

export default Swipeable;
