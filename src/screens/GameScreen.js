import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text, Dimensions, BackHandler} from 'react-native';

const {width, height} = Dimensions.get('screen');

const GameScreen = ({players, setPlayers, setInGame}) => {
  //Set up BackHandler to go back to title screen when pressing back button (ANDROID)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setInGame(false);
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <Text>GameScreen</Text>
      <Text>{players[0].name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default GameScreen;
