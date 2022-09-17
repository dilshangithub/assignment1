import React from 'react';
import {TouchableOpacity, Text,Image, StyleSheet, Button} from 'react-native';
import icons from '../../components/icons';
import {FONTS} from '../theme';

const LineButton = props => {
  return (

    <TouchableOpacity onPress={props.customClick}
    style={{height: 60,width: '100%',}}
    >
    <Text
      style={{
        ...FONTS.DrStronge,
        marginTop: 8,
        marginLeft: 10,
        fontSize: 25,
      }}>
      {props.title}
    </Text>
    <Image
      source={icons.forward}
      style={{
        // marginLeft: 5,
        right: 10,
        marginTop: 15,
        height: 25,
        width: 25,
        position: 'absolute',
        tintColor: '#D45A00',
      }}
    />
  </TouchableOpacity>
  );
};
export default LineButton;