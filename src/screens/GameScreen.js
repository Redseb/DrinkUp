import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');

//Components
import Card from '../components/Card';

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
      <View style={[styles.backButtonContainer, StyleSheet.absoluteFillObject]}>
        <TouchableOpacity
          onPress={() => {
            setInGame(false);
          }}>
          <Icon name="arrow-back" size={height / 18} color="#FDD451" />
        </TouchableOpacity>
      </View>
      <Card
        title={'👩 Longest Hair 👩'}
        desc={'The player with the longest hair drinks'}
        type={'Default'}
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
