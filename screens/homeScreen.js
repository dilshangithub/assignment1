import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Share from 'react-native-share';
import KeepAwake from 'react-native-keep-awake';
import {MenuProvider} from 'react-native-popup-menu';
import icons from '../components/icons';
import SuccessButton from '../components/successbutton';
import WarningButton from '../components/warningbutton';
import soundEffectsUtil from '../utils/soundEffectsUtil';
import {FONTS} from '../components/theme';

KeepAwake.activate();

const HomeScreen = ({navigation}) => {
  const [isMute, setIsMute] = useState(true);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);

  const pauseAudio = () => {
    setIsMute(!isMute);
  };

  const customShare = async () => {
    const shareOptions = {
      message: 'Hey, Here I fond awesome game',
      url: 'www.example.com',
    };
    try {
      const shareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error=>', error);
    }
  };

  return (
    <MenuProvider>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            marginRight: 20,
            // marginBottom: 20,
            backgroundColor: '#ebebe0',
          }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 30,
              marginLeft: 10,
              marginTop: 10,
            }}
            onPress={() => {
              pauseAudio(), soundEffectsUtil.touchableButtonSound();
            }}>
            <Image
              source={isMute ? icons.speaker_on : icons.speaker_off}
              style={{
                marginLeft: 5,
                marginTop: 5,
                height: 40,
                width: 40,
                tintColor: '#7a7a52',
              }}
            />
          </TouchableOpacity>

          <View style={{position: 'absolute', right: 25}}>
            <View
              style={{
                height: 50,
                width: 30,
                marginTop: 10,
              }}>
              <Menu style={{}}>
                <MenuTrigger
                  onPress={() => {
                    soundEffectsUtil.touchableButtonSound();
                  }}>
                  <Image
                    source={icons.menu_icon}
                    style={{
                      marginLeft: 5,
                      marginTop: 5,
                      height: 40,
                      width: 40,
                      tintColor: '#7a7a52',
                    }}
                  />
                </MenuTrigger>
                <MenuOptions style={{backgroundColor: '#c2c2a3'}}>
                  <MenuOption
                    onSelect={() => {
                      alert(`Settings`),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                    style={{padding: 10}}>
                    <Image
                      source={icons.settings}
                      style={{
                        marginLeft: 5,
                        marginTop: 5,
                        height: 25,
                        width: 25,
                        tintColor: '#595959',
                      }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        marginTop: 9,
                        marginLeft: 55,
                        ...FONTS.KidsEdition,
                        color: '#595959',
                        fontSize: 25,
                      }}>
                      Settings
                    </Text>
                  </MenuOption>

                  <MenuOption
                    onSelect={() => {
                      setIsShareVisible(true),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                    style={{padding: 10}}>
                    <Image
                      source={icons.share}
                      style={{
                        marginLeft: 5,
                        marginTop: 5,
                        height: 25,
                        width: 25,
                        tintColor: '#595959',
                      }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        marginTop: 9,
                        marginLeft: 55,
                        ...FONTS.KidsEdition,
                        color: '#595959',
                        fontSize: 25,
                      }}>
                      Share
                    </Text>
                  </MenuOption>

                  <MenuOption
                    onSelect={() => {
                      setIsAboutVisible(true),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                    style={{padding: 10}}>
                    <Image
                      source={icons.info}
                      style={{
                        marginLeft: 5,
                        marginTop: 5,
                        height: 25,
                        width: 25,
                        tintColor: '#595959',
                      }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        marginTop: 9,
                        marginLeft: 55,
                        ...FONTS.KidsEdition,
                        color: '#595959',
                        fontSize: 25,
                      }}>
                      About
                    </Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </View>

        <View style={{flex: 1, backgroundColor: '#ebebe0'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{marginLeft: 125, marginRight: 125}}>
              <SuccessButton
                title="Play!"
                customClick={() => {
                  navigation.navigate('GameScreen'),
                    soundEffectsUtil.touchableButtonSound();
                }}
              />
            </View>
            <View style={{marginLeft: 125, marginRight: 125, marginTop: 15}}>
              <WarningButton
                title="Login"
                customClick={() => {
                  navigation.navigate('LoginScreen'),
                    soundEffectsUtil.touchableButtonSound();
                }}
              />
            </View>
          </View>
        </View>

        {/* About Model */}
        <Modal transparent={true} visible={isAboutVisible}>
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <View
              style={{
                padding: 20,
                borderRadius: 20,
                height: '50%',
                marginLeft: 30,
                marginRight: 30,
                borderColor: '#73737',
                borderEndWidth: 2,
                backgroundColor: '#c2c2a3',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsAboutVisible(false),
                    soundEffectsUtil.touchableButtonSound();
                }}>
                <Image
                  source={icons.close}
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    height: 25,
                    width: 25,
                    tintColor: '#595959',
                  }}
                />
              </TouchableOpacity>

              <Text style={{...FONTS.header1}}>About Us</Text>
              <View style={{alignItems: 'center', marginTop: 10}}>
                <Text>Developed By: Dilshan Wijesinghe</Text>
                <Text>Index Number: MS22045676</Text>
              </View>

              <Text style={{...FONTS.header1, marginTop: 20}}>About game</Text>
              <Text style={{marginTop: 10, textAlign: 'center'}}>
                A game is a structured form of play, usually undertaken for
                entertainment or fun, and sometimes used as an educational tool.
                Games are different from work, which is usually carried out for
                remuneration, and from art, which is more often an expression of
                aesthetic or ideological elements
              </Text>
            </View>
          </View>
        </Modal>

        {/* Share Model */}
        <Modal transparent={true} visible={isShareVisible}>
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <View
              style={{
                padding: 20,
                borderRadius: 20,
                height: '50%',
                marginLeft: 30,
                marginRight: 30,
                borderColor: '#73737',
                borderEndWidth: 2,
                backgroundColor: '#c2c2a3',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsShareVisible(false),
                    soundEffectsUtil.touchableButtonSound();
                }}>
                <Image
                  source={icons.close}
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    height: 25,
                    width: 25,
                    tintColor: '#595959',
                  }}
                />
              </TouchableOpacity>

              <Text style={{...FONTS.header1}}>Share with your contacts</Text>
              <Text
                style={{
                  ...FONTS.header3,
                  fontSize: 25,
                  marginTop: 30,
                  textAlign: 'center',
                  color: 'red',
                }}>
                Now you can share this game with your friends
              </Text>
              <View style={{marginTop: 60}}>
                <SuccessButton
                  title="Share Now"
                  customClick={() => {
                    customShare(), soundEffectsUtil.touchableButtonSound();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default HomeScreen;
