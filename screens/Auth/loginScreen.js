import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import LinearGradient from 'react-native-linear-gradient';

import SuccessButton from '../../components/buttons/successbutton';
import UrlButton from '../../components/buttons/urlbutton';
import {FONTS} from '../../components/theme';
import icons from '../../components/icons';
import UpperNavBar from '../../components/upperNavBar';
import textInputValidateUtil from '../../utils/textInputValidateUtil';
import soundEffectsUtil from '../../utils/soundEffectsUtil'

KeepAwake.activate();

const LoginScreen = ({navigation}) => {
  useEffect(() => {}, []);

  const [errorFlag, setErrorFlag] = React.useState({});

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setshowPassword] = useState(false);


  const loginMe = () => {
    const error = textInputValidateUtil.validateLoginForm(email, password);

    if (error) {
      setErrorFlag(error);
      return;
    }

    setErrorFlag({});
    // todo
    alert('success');
  };

  function renderLoginView() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#ddedea'}}>
          {/* Body */}
          <View style={{flex: 1}}>
            <Text style={{...FONTS.header1, marginTop: 25, color: '#ff6600'}}>
              Login to Your Account
            </Text>
            <View style={{marginTop: 15}}>
              <UrlButton
                title="Don't have an account? Sign up"
                customClick={() => {navigation.navigate('SignupScreen'), soundEffectsUtil.touchableButtonSound()}}
              />
            </View>

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
              <View style={{marginTop:-20, marginBottom:20, marginLeft:20}}>
                {Boolean(errorFlag.emailError) && (
                  <Text style={{color:'red'}}>{errorFlag.emailError}</Text>
                )}
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Password"
                  placeholderTextColor="#c2c2a3"
                  secureTextEntry={!showPassword}
                  onChangeText={value => setPassword(value)}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 5,
                    height: 30,
                    width: 30,
                  }}
                  onPress={() => setshowPassword(!showPassword)}>
                  <Image
                    source={showPassword ? icons.disable_eye : icons.enable_eye}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: '#7a7a52',
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{marginTop:-20, marginBottom:20, marginLeft:20}}>
                {Boolean(errorFlag.passwordError) && (
                  <Text style={{color:'red'}}>{errorFlag.passwordError}</Text>
                )}
              </View>


              <View style={{marginTop: 15}}>
                <UrlButton
                  title="Forgot Password?"
                  customClick={() =>{
                    navigation.navigate('ForgotPasswordScreen'),
                    soundEffectsUtil.touchableButtonSound()
                  }}
                />
              </View>

              <View style={{marginTop: 20}}>
                <SuccessButton title="LOGIN" customClick={() => {loginMe(),soundEffectsUtil.touchableButtonSound()}} />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.android === 'android' ? 'padding' : null}
      style={{flex: 1}}>

      <UpperNavBar navigation={navigation}/>

      <LinearGradient colors={['#ddedea', '#ddedea']} style={{flex: 1}}>
        <ScrollView>{renderLoginView()}</ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
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

export default LoginScreen;
