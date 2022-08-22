import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import SuccessButton from '../components/successbutton';

KeepAwake.activate();

const GameScreen = ({ navigation }) => {
    useEffect(() => {
    }, []);
   
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'green' }}>
          <View style={{ flex: 1 }}>
            

          </View>
        </View>
      </SafeAreaView>
    );
  };
   
  export default GameScreen;
  