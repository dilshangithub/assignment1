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

import SuccessButton from '../components/successbutton';
import UrlButton from '../components/urlbutton';
import {FONTS} from '../components/theme';
import icons from '../components/icons';
import images from '../components/images';

KeepAwake.activate();

const ForgotPasswordScreen = ({navigation}) => {
  useEffect(() => {}, []);

  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#ebebe0'}}>
        <View
          style={{
            width: '100%',
            borderBottomWidth: 3,
            marginRight: 20,
            marginBottom: 20,
            backgroundColor: '#d6d6c2',
            borderColor: '#c2c2a3',
          }}>
          <TouchableOpacity
            style={{
              // position:'relative',
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

        <View style={{flex: 1}}>
          <Text style={{...FONTS.header1, marginTop: 25, color: '#ff6600'}}>
            Forgot your password?
          </Text>
          <Text style={{...FONTS.header2, marginTop: 25, color: '#39B404', marginLeft:20,marginRight:20}}>
            Don't worry.Enter your email address to reset your password.
          </Text>
          <View
            style={{flex: 1, marginTop: 40, marginLeft: 30, marginRight: 30}}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#c2c2a3"
                onChangeText={email => setEmail(email)}
              />
            </View>

            <SuccessButton
              title="Reset Password"
              customClick={() => console.log('reset password')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
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

export default ForgotPasswordScreen;
