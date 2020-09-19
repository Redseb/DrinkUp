import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
  repeat,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');

const PlayerBadge = ({playerName, id, players, setPlayers}) => {
  return (
    <View style={[styles.container]}>
      <TextInput
        style={styles.name}
        numberOfLines={1}
        maxLength={12}
        placeholder={`Player ${id}`}
        onChangeText={(text) => {
          let newPlayers = players;
          for (let i = 0; i < newPlayers.length; i++) {
            if (newPlayers[i].id == id) {
              newPlayers[i].name = text;
              break;
            }
          }
          setPlayers(newPlayers);
        }}>
        {playerName}
      </TextInput>
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => {
          setPlayers(players.filter((player) => player.id !== id));
        }}>
        <Icon name="trash" size={height / 25} color="#303030" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FDD451',
    marginVertical: height / 60,
    marginHorizontal: width / 20,
    borderRadius: 10,
    borderColor: '#303030',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
  },
  name: {
    fontFamily: 'FjallaOne',
    fontSize: height / 25,
    textDecorationLine: 'underline',
  },
});

export default PlayerBadge;
