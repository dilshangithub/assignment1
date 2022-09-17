import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import LinearGradient from 'react-native-linear-gradient';

import SuccessButton from '../../components/buttons/successbutton';
import UrlButton from '../../components/buttons/urlbutton';
import {FONTS} from '../../components/theme';
import icons from '../../components/icons';
import images from '../../components/images';
import UpperNavBar from '../../components/upperNavBar';
import textInputValidateUtil from '../../utils/textInputValidateUtil';
import soundEffectsUtil from '../../utils/soundEffectsUtil'

KeepAwake.activate();

const ForgotPasswordScreen = ({navigation}) => {
  useEffect(() => {}, []);

  const [errorFlag, setErrorFlag] = useState({});
  const [email, setEmail] = useState('');

  const resetMyPassword = () => {
    let error = textInputValidateUtil.validateForgotPasswordForm(email);

    if (error) {
      setErrorFlag(error);
      return;
    }

    setErrorFlag({});
    alert('success');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#ddedea'}}>
        <UpperNavBar navigation={navigation} />

        <View style={{flex: 1}}>
          <Text style={{...FONTS.header1, marginTop: 25, color: '#ff6600'}}>
            Forgot your password?
          </Text>
          <Text
            style={{
              ...FONTS.header2,
              marginTop: 25,
              color: '#85adad',
              marginLeft: 20,
              marginRight: 20,
            }}>
            Don't worry.Enter your email address to reset your password.
          </Text>
          <View
            style={{flex: 1, marginTop: 40, marginLeft: 30, marginRight: 30}}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#c2c2a3"
                onChangeText={value => setEmail(value)}
              />
            </View>

            <View style={{marginTop: -20, marginBottom: 15, marginLeft: 20}}>
                {Boolean(errorFlag.emailError) && (
                  <Text style={{color: 'red'}}>{errorFlag.emailError}</Text>
                )}
              </View>

            <View style={{marginTop: 15}}>
              <SuccessButton
                title="Reset Password"
                customClick={() => {resetMyPassword(), soundEffectsUtil.touchableButtonSound()}}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderColor: '#7a7a52',
    borderWidth: 2,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});

export default ForgotPasswordScreen;
