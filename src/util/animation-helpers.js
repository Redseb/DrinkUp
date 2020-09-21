import Animated, {
  Easing,
  Clock,
  Value,
  block,
  cond,
  not,
  clockRunning,
  startClock,
  timing as reTiming,
  spring as reSpring,
  stopClock,
  add,
  multiply,
  call,
  and,
  eq,
  abs,
  sub,
  neq,
  set,
  defined,
} from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {min} from 'react-native-redash/lib/module/v1';

export const timing = (timingConfig) => {
  const {clock, easing, duration, from, to: toValue} = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    from: 0,
    to: 1,
    ...timingConfig,
  };

  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    toValue,
    duration,
    easing,
  };

  return block([
    cond(not(clockRunning(clock)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, from),
      set(state.frameTime, 0),
      startClock(clock),
    ]),
    reTiming(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
};

export const delay = (node, duration) => {
  const clock = new Clock();
  return block([
    timing({clock, from: 0, to: 1, duration}),
    cond(not(clockRunning(clock)), node),
  ]);
};

export const snapPoint = (value, velocity, points) => {
  const point = add(value, multiply(0.2, velocity));
  const diffPoint = (p) => abs(sub(point, p));
  const deltas = points.map((p) => diffPoint(p));
  const minDelta = min(...deltas);
  return points.reduce(
    (acc, p) => cond(eq(diffPoint(p), minDelta), p, acc),
    new Value(),
  );
};

export const withSpring = (props) => {
  const {
    value,
    velocity,
    state,
    snapPoints,
    offset,
    config: springConfig,
    onSnap,
  } = {
    offset: new Value(0),
    ...props,
  };
  const clock = new Clock();
  const springState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
    ...springConfig,
  };

  const gestureAndAnimationIsOver = new Value(1);
  const isSpringInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishSpring = [
    set(offset, springState.position),
    stopClock(clock),
    set(gestureAndAnimationIsOver, 1),
  ];
  const snap = onSnap
    ? [cond(clockRunning(clock), call([springState.position], onSnap))]
    : [];
  return block([
    cond(isSpringInterrupted, finishSpring),
    cond(gestureAndAnimationIsOver, set(springState.position, offset)),
    cond(neq(state, State.END), [
      set(gestureAndAnimationIsOver, 0),
      set(springState.finished, 0),
      set(springState.position, add(offset, value)),
    ]),
    cond(and(eq(state, State.END), not(gestureAndAnimationIsOver)), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.velocity, velocity),
        set(springState.time, 0),
        set(
          config.toValue,
          snapPoint(springState.position, velocity, snapPoints),
        ),
        startClock(clock),
      ]),
      reSpring(clock, springState, config),
      cond(springState.finished, [...snap, ...finishSpring]),
    ]),
    springState.position,
  ]);
};

export const withOffset = ({offset, value, state: gestureState}) => {
  const safeOffset = new Value();
  return block([
    cond(
      not(defined(safeOffset)),
      set(safeOffset, offset === undefined ? 0 : offset),
    ),
    cond(eq(gestureState, State.ACTIVE), add(safeOffset, value), [
      set(safeOffset, add(safeOffset, value)),
    ]),
  ]);
};

export const withTransition = (
  value,
  velocity,
  gestureState = new Value(State.UNDETERMINED),
  springConfig,
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
    ...springConfig,
  };
  return block([
    startClock(clock),
    set(config.toValue, value),
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.velocity, velocity), set(state.position, value)],
      reSpring(clock, state, config),
    ),
    state.position,
  ]);
};
