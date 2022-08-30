import 'react-native-gesture-handler';

import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import icons from './icons';
import images from './images';
import soundEffectsUtil from '../utils/soundEffectsUtil'

const upperNavBar = props => {
  return (
    <View
      style={{
        width: '100%',
        borderBottomWidth: 3,
        marginRight: 20,
        // marginBottom: 20,
        backgroundColor: '#d6d6c2',
        borderColor: '#c2c2a3',
      }}>
      {/* Back */}
      <TouchableOpacity
        style={{
          height: 50,
          width: 30,
          marginLeft: 10,
          marginTop: 10,
        }}
        onPress={() =>{
          props.navigation.canGoBack()
            ? props.navigation.goBack()
            : props.navigation.navigate('HomeScreen'),
            soundEffectsUtil.touchableButtonSound();
        }
        }>
        <Image
          source={icons.back}
          style={{
            marginLeft: 5,
            marginTop: 5,
            height: 30,
            width: 30,
            tintColor: '#7a7a52',
          }}
        />
      </TouchableOpacity>
      {/* Home */}
      <View style={{position: 'absolute', right: 20}}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 30,
            marginTop: 10,
          }}
          onPress={() => {props.navigation.navigate('HomeScreen'), soundEffectsUtil.touchableButtonSound();}}>
          <Image
            source={icons.home}
            style={{
              marginLeft: 5,
              marginTop: 5,
              height: 30,
              width: 30,
              tintColor: '#7a7a52',
            }}
          />
        </TouchableOpacity>
      </View>
      {/* Logo */}
      <View style={{position: 'absolute', marginLeft: '45%'}}>
        <Image
          source={images.logo}
          style={{
            marginTop: 5,
            height: 50,
            width: 50,
          }}
        />
      </View>
    </View>
  );
};

export default upperNavBar;
