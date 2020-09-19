import React, {useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import HomeScreen from './HomeScreen';

const {width, height} = Dimensions.get('screen');

//Used to display and keeptrack of different screens without rerendering the background component
const ScreenContainer = () => {
  const [players, setPlayers] = useState([
    {name: '', id: 1},
    {name: '', id: 2},
  ]);
  return (
    <>
      <HomeScreen players={players} setPlayers={setPlayers} />
    </>
  );
};

const styles = StyleSheet.create({});

export default ScreenContainer;
