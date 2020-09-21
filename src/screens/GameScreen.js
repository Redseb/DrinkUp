import React, {useEffect, useState} from 'react';
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
//Utils
import {initDeck, shuffle, nextCard} from '../util/card-supplier';

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

  const [deck, setDeck] = useState(() => initDeck());
  const [currCardIndex, setCurrCardIndex] = useState(0);

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
        title={deck[currCardIndex + 1].title}
        desc={deck[currCardIndex + 1].desc}
        type={deck[currCardIndex + 1].type}
      />
      <Card
        title={deck[currCardIndex].title}
        desc={deck[currCardIndex].desc}
        type={deck[currCardIndex].type}
        style={{transform: [{translateX: 50}]}}
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
