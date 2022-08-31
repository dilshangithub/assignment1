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
import SuccessButton from '../components/successbutton';
import images from '../components/images';
import soundEffectsUtil from '../utils/soundEffectsUtil';

KeepAwake.activate();

const WelcomScreen = ({navigation}) => {
  soundEffectsUtil.backgroundSoundEffect();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ImageBackground
          source={images.welcome_background}
          resizeMode="cover"
          style={styles.image}>
          <Image source={images.logo} style={styles.Logo} />

          <View style={{marginLeft: 125, marginRight: 125}}>
            <SuccessButton
              title="Continue"
              customClick={() => {
                navigation.navigate('HomeScreen'),
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
    height: 150,
    width: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 170,
    marginTop: 60,
    borderRadius: 20,
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
