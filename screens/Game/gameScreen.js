import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessButton from '../../components/successbutton';
import Game from './Game';


KeepAwake.activate();

const GameScreen=({ navigation })=>{

  return <Game />;
  };
   
  export default GameScreen;
  