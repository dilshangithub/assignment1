import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import SuccessButton from '../components/successbutton';
import Game from '../src/Game';


KeepAwake.activate();

const GameScreen=({ navigation })=>{
  return <Game />;
  };
   
  export default GameScreen;
  