/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Background from './src/components/Background';
//Screens
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  const [players, setPlayers] = useState([
    {name: '', id: 1},
    {name: '', id: 2},
  ]);
  return (
    <>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <SafeAreaView>
        <Background />
        <HomeScreen players={players} setPlayers={setPlayers} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
