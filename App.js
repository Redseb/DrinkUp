/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Background from './src/components/Background';
//Screens
import HomeScreen from './src/screens/HomeScreen';
import ScreenContainer from './src/screens/ScreenContainer';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <SafeAreaView>
        <Background />
        <ScreenContainer />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
