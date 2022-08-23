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
        style={styles.gradient}>
        <Text style={{...FONTS.button}}>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#b34700',
    height: 60,
  },
  appButtonContainer: {
    //shadow
    // shadowColor:'black',
    // shadowOffset:{width:5,height:2},
    // shadowOpacity:10,
    // shadowRadius:10,
    // elevation:8,
  },
});

export default WarningButton;
