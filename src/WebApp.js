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

import Background from './components/Background';
//Screens
import ScreenContainer from './screens/ScreenContainer';

const App = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <SafeAreaView>
        {/* <Background /> */}
        <ScreenContainer />
      </SafeAreaView>
    </>
  );
};

export default App;
