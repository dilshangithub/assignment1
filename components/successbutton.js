import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from './theme';

const SuccessButton = props => {
  return (
    <TouchableOpacity
      onPress={props.customClick}
      style={styles.appButtonContainer}>
      <LinearGradient
        colors={['#4AD400', '#39B404', '#287D02']}
        start={{x: 0, y: 0}} // Gradient starting
        end={{x: 0, y: 0.5}} // Gradient ending
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
    borderColor: '#009933',
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

export default SuccessButton;
