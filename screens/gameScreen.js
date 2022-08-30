import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import SuccessButton from '../components/successbutton';
import World from '../src/World';


KeepAwake.activate();

const GameScreen = ({ navigation }) => {
  return <World />;
  };
   
  export default GameScreen;
  