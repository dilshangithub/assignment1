import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from './theme';

const SuccessButton = props => {
  return (
    <TouchableOpacity onPress={props.customClick}>
      <LinearGradient
        colors={['#4AD400', '#39B404', '#287D02']}
        start={{x: 0, y: 0}} // Gradient starting coordinates
        end={{x: 0, y: 0.5}} // Gradient ending coordinates
        style={styles.appButtonContainer}>
        <Text style={{...FONTS.button}}>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    alignItems: 'center',
    elevation: 8,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#009933',

    padding: 10,
    marginTop: 16,
    height: 60,
  },
});

export default SuccessButton;
