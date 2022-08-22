import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from './theme';

const UrlButton = props => {
  return (
    <TouchableOpacity onPress={props.customClick}>
      <Text style={{...FONTS.header2, color: '#39B404'}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    alignItems: 'center',
    elevation: 8,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,

    padding: 10,
    marginTop: 16,
    height: 60,
  },
});

export default UrlButton;
