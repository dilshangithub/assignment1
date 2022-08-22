import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import SuccessButton from '../components/successbutton';
import WarningButton from '../components/warningbutton';

KeepAwake.activate();

const HomeScreen = ({navigation}) => {
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#ebebe0'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {/* <Mytext text="SQLite Example" /> */}

          <View style={{marginLeft: 125, marginRight: 125}}>
            <SuccessButton
              title="Play!"
              customClick={() => navigation.navigate('GameScreen')}
            />
          </View>
          <View style={{marginLeft: 125, marginRight: 125}}>
            <WarningButton
              title="Login"
              customClick={() => navigation.navigate('LoginScreen')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
