import React, {useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';

const {width, height} = Dimensions.get('screen');

//Used to display and keeptrack of different screens without rerendering the background component
const ScreenContainer = () => {
  const [players, setPlayers] = useState([
    {name: '', id: 1},
    {name: '', id: 2},
  ]);
  const [inGame, setInGame] = useState(false);
  return (
    <>
      {inGame ? (
        <GameScreen players={players} setInGame={setInGame} />
      ) : (
        <HomeScreen
          players={players}
          setPlayers={setPlayers}
          setInGame={setInGame}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default ScreenContainer;
