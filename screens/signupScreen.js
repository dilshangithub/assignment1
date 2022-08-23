import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Form,
  Image,
  FormLabel,
  StyledInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import LinearGradient from 'react-native-linear-gradient';

import SuccessButton from '../components/successbutton';
import UrlButton from '../components/urlbutton';
import {FONTS} from '../components/theme';
import icons from '../components/icons';
import images from '../components/images';

KeepAwake.activate();

const SignupScreen = ({navigation}) => {
  useEffect(() => {}, []);

  const [showPassword, setshowPassword] = useState(false);

  function rendersignupView() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#ebebe0'}}>
          {/* Body */}
          <View style={{flex: 1}}>
            <Text style={{...FONTS.header1, marginTop: 25, color: '#ff6600'}}>
              Create your account!
            </Text>
            <View style={{marginTop: 15}}>
              <UrlButton
                title="Already have an account? Log in"
                customClick={() => navigation.navigate('LoginScreen')}
              />
            </View>

            <View
              style={{flex: 1, marginTop: 40, marginLeft: 30, marginRight: 30}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  ...FONTS.header3,
                }}>
                Email
              </Text>
              <View style={styles.inputView}>
                <TextInput style={styles.TextInput} />
              </View>

              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  ...FONTS.header3,
                }}>
                Password
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  secureTextEntry={!showPassword}
                  // onChangeText={(showPassword) => setPassword(showPassword)}
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

              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  ...FONTS.header3,
                }}>
                Firsr Name
              </Text>
              <View style={styles.inputView}>
                <TextInput style={styles.TextInput} />
              </View>

              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 5,
                  ...FONTS.header3,
                }}>
                Last Name
              </Text>
              <View style={styles.inputView}>
                <TextInput style={styles.TextInput} />
              </View>
              <View style={{marginTop: 20}}>
                <SuccessButton
                  title="Sign Up"
                  customClick={() => console.log('user signup')}
                />
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
      {/* Header */}
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
          onPress={() => navigation.navigate('LoginScreen')}>
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
            onPress={() => navigation.navigate('HomeScreen')}>
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

      <LinearGradient colors={['#ebebe0', '#ebebe0']} style={{flex: 1}}>
        <ScrollView>{rendersignupView()}</ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: 'white',
    borderRadius: 25,
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

export default SignupScreen;
