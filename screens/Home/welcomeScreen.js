import React, {useEffect} from 'react';
import KeepAwake from 'react-native-keep-awake';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessButton from '../../components/buttons/successbutton';
import images from '../../components/images';
import soundEffectsUtil from '../../utils/soundEffectsUtil';
import {EASY_PROFILE} from '../../components/game/Constants';


KeepAwake.activate();

const WelcomScreen = ({navigation}) => {
  soundEffectsUtil.backgroundSoundEffect();



  const saveGameProfile = async () => {
    let value = await AsyncStorage.getItem('game_profile');
    if (value != null) {
      console.log(value);
    } else {
      AsyncStorage.setItem('game_profile', EASY_PROFILE.toString());
      console.log('Set default value');
    }

    // AsyncStorage.getItem('profile').then(val => {
    //   console.log(val);
    // });
    // AsyncStorage.setItem('profile', '0.5');
    // console.log('Set default profile');
  };

  // const fetchgameProfile = () => {
  //   AsyncStorage.getItem('profile').then(val => {
  //     console.log(val);
  //   });
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ImageBackground
          source={images.welcome_background}
          resizeMode="cover"
          style={styles.image}>
          <Image source={images.logo} style={styles.Logo} />


          <Image source={images.carLogo} style={styles.carLogo} />

          <View style={{marginLeft: 125, marginRight: 125}}>
            <SuccessButton
              title="Continue"
              customClick={() => {
                navigation.navigate('HomeScreen'),
                  saveGameProfile(),
                  // fetchgameProfile(),
                  soundEffectsUtil.touchableButtonSound();
              }}
            />
          </View>
        </ImageBackground>
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    // justifyContent: 'center',
  },
  Logo: {
    // height: '80%',
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginBottom: 170,
    marginTop: -180,
  },

  carLogo: {
    height: 300,
    // width: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -350,
    marginBottom:50
    // flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default WelcomScreen;
