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
  const scale = useSharedValue(0);
  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: withTiming(scale.value, {duration: 200})}],
    };
  });
  useEffect(() => {
    scale.value = 1;
  }, []);

  return (
    <Animated.View style={[scaleStyle, styles.container]}>
      <TextInput
        style={styles.name}
        numberOfLines={1}
        maxLength={12}
        placeholder={`Player ${id}`}
        // value={playerName}
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
          scale.value = 0;
          setTimeout(() => {
            setPlayers(players.filter((player) => player.id !== id));
          }, 200);
        }}>
        <Icon name="trash" size={height / 25} color="#303030" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FDD451',
    marginVertical: height / 60,
    marginHorizontal: width / 10,
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
