import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
  sequence,
} from 'react-native-reanimated';

import PlayerBadge from '../components/PlayerBadge';
import Button from '../components/Button';

const {width, height} = Dimensions.get('screen');

const HomeScreen = ({players, setPlayers}) => {
  const scaleToButton = useSharedValue(1);
  //Resets scaleToButton whenever players changes (removing players).
  //Without this the button animates when removing players too
  useEffect(() => {
    scaleToButton.value = 1;
  }, [players]);
  const scaleButtonAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: sequence(
            withTiming(scaleToButton.value, {
              duration: 100,
              easing: Easing.bezier(0.5, 0.01, 0, 1),
            }),
            withTiming(1, {
              duration: 100,
              easing: Easing.bezier(0.5, 0.01, 0, 1),
            }),
          ),
        },
      ],
    };
  });

  const playerBadges = players.map((player) => (
    <PlayerBadge
      playerName={player.name}
      players={players}
      setPlayers={setPlayers}
      id={player.id}
      key={player.id}
    />
  ));

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Drink Up!</Text>
      </View>
      <View style={styles.playersContainer}>
        <ScrollView>{playerBadges}</ScrollView>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          text={'Add a Player'}
          onPress={() => {
            setPlayers([
              ...players,
              {
                name: '',
                id: players.length > 0 ? players[players.length - 1].id + 1 : 1,
              },
            ]);
            scaleToButton.value = 0.9;
          }}
          style={scaleButtonAnimStyle}
        />
        <Button
          text={players.length == 0 ? 'Play Without Players' : 'Play!'}
          onPress={() => {
            console.log('Hi');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleContainer: {
    backgroundColor: '#303030',
    padding: 10,
    width: width,
    marginTop: height / 20,
    elevation: 10,
  },
  title: {
    color: '#FDD451',
    fontSize: height / 12,
    textAlign: 'center',
    fontFamily: 'FjallaOne',
  },
  playersContainer: {
    height: height / 3,
    marginBottom: height / 50,
  },
  buttonsContainer: {
    height: height / 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
