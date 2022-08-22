import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from './theme';

const WarningButton = props => {
  return (
    <TouchableOpacity onPress={props.customClick}>
      <LinearGradient
        colors={['#FFB200', '#E08400', '#D45A00']}
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
    borderColor: '#b34700',

    padding: 10,
    marginTop: 16,
    height: 60,
  },
});

export default WarningButton;
