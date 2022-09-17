import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import icons from '../../components/icons';
import SuccessButton from '../../components/buttons/successbutton';
import WarningButton from '../../components/buttons/warningbutton';
import LineButton from '../../components/buttons/lineButton';
import soundEffectsUtil from '../../utils/soundEffectsUtil';
import {FONTS} from '../../components/theme';
import images from '../../components/images';
import textInputValidateUtil from '../../utils/textInputValidateUtil';
import {
  EASY_PROFILE,
  MEDIUM_PROFILE,
  HARD_PROFILE,
} from '../../components/game/Constants';

KeepAwake.activate();

const HomeScreen = ({navigation}) => {
  const [isMute, setIsMute] = useState(true);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isAccountVisible, setIsAccountVisible] = useState(false);
  const [isLogoutScreenVisible, setIsLogoutScreenVisible] = useState(false);
  const [isChangePasswordScreenVisible, setIsChangePasswordScreenVisible] =
    useState(false);
  const [isUpdateInfoScreenVisible, setIsUpdateInfoScreenVisible] =
    useState(false);
  const [isScoreBoardVisible, setIsScoreBoardVisible] = useState(false);
  const [isEasy, isSetEasy] = useState(false);
  const [isMedium, isSetMedium] = useState(false);
  const [isHard, isSetHard] = useState(false);
  const [isLoginUser, isSetLoginUser] = useState(false); // need to implement: False
  const [topScore, setTopScore] = React.useState(0);

  const [resetPerrorFlag, setresetPerrorFlag] = React.useState({});
  const [updateInfoErrorFlag, setupdateInfoErrorFlag] = React.useState({});

  const [currentPassword, setcurrentPassword] = React.useState('');
  const [showCurrentPassword, setshowCurrentPassword] = useState(false);

  const [newPassword, setNewPassword] = React.useState('');
  const [showNewPassword, setshowNewPassword] = useState(false);

  const [reEnterPassword, setReEnrterPassword] = React.useState('');
  const [showreEnterPassword, setshowreEnterPassword] = useState(false);

  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const pauseAudio = () => {
    setIsMute(!isMute);
  };

  const logoutMe = () => {
    //Logout logic
    //.....

    setIsAccountVisible(false);
    setIsLogoutScreenVisible(false);
    navigation.navigate('WelcomScreen');
  };

  const findScores = () => {  // fetch top scores for community as well
    AsyncStorage.getItem('top_score').then(tScore => {
      setTopScore(tScore);
      console.log('Fetched item');
    });
  };

  const changeMypassword = () => {
    const error = textInputValidateUtil.validateResetPasswordForm(
      currentPassword,
      newPassword,
      reEnterPassword,
    );
    if (error) {
      setresetPerrorFlag(error);
      return;
    }
    setresetPerrorFlag({});
    // logic
    console.log('chnage password');
  };

  const updateMyInformation = () => {
    const error = textInputValidateUtil.validateUpdateInfoForm(
      email,
      firstName,
      lastName,
    );

    if (error) {
      setupdateInfoErrorFlag(error);
      return;
    }
    setupdateInfoErrorFlag({});
    // logic
    console.log('updated info');
  };

  const customShare = async () => {
    const shareOptions = {
      message: 'Hey, Do you like to play Taxi Driver? Join with us..',
      url: 'www.taxidriver.com',
    };
    try {
      const shareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error=>', error);
    }
  };

  const getGameProfile = async () => {
    AsyncStorage.getItem('game_profile').then(gProfile => {
      if (gProfile == EASY_PROFILE) {
        isSetEasy(true);
      } else if (gProfile == MEDIUM_PROFILE) {
        isSetMedium(true);
      } else if (gProfile == HARD_PROFILE) {
        isSetHard(true);
      }
    });
  };

  const setGameProfile = async profile => {
    AsyncStorage.setItem('game_profile', profile);
    console.log('profile set: ', profile);
  };

  function renderReEnterPasswordView() {
    return (
      <SafeAreaView>
        <View style={{marginTop: 50}}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Current Password"
              placeholderTextColor="#c2c2a3"
              secureTextEntry={!showCurrentPassword}
              onChangeText={value => setcurrentPassword(value)}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                bottom: 5,
                height: 30,
                width: 30,
              }}
              onPress={() => setshowCurrentPassword(!showCurrentPassword)}>
              <Image
                source={
                  showCurrentPassword ? icons.disable_eye : icons.enable_eye
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#7a7a52',
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: -20, marginBottom: 20, marginLeft: 20}}>
            {Boolean(resetPerrorFlag.currentPasswordError) && (
              <Text style={{color: 'red'}}>
                {resetPerrorFlag.currentPasswordError}
              </Text>
            )}
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="New Password"
              placeholderTextColor="#c2c2a3"
              secureTextEntry={!showNewPassword}
              onChangeText={value => setNewPassword(value)}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                bottom: 5,
                height: 30,
                width: 30,
              }}
              onPress={() => setshowNewPassword(!showNewPassword)}>
              <Image
                source={showNewPassword ? icons.disable_eye : icons.enable_eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#7a7a52',
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: -20, marginBottom: 20, marginLeft: 20}}>
            {Boolean(resetPerrorFlag.newPasswordError) && (
              <Text style={{color: 'red'}}>
                {resetPerrorFlag.newPasswordError}
              </Text>
            )}
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Re-Enter New Password"
              placeholderTextColor="#c2c2a3"
              secureTextEntry={!showreEnterPassword}
              onChangeText={value => setReEnrterPassword(value)}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                bottom: 5,
                height: 30,
                width: 30,
              }}
              onPress={() => setshowreEnterPassword(!showreEnterPassword)}>
              <Image
                source={
                  showreEnterPassword ? icons.disable_eye : icons.enable_eye
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#7a7a52',
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: -20, marginBottom: 20, marginLeft: 20}}>
            {Boolean(resetPerrorFlag.reEnterPasswordError) && (
              <Text style={{color: 'red'}}>
                {resetPerrorFlag.reEnterPasswordError}
              </Text>
            )}
          </View>
        </View>

        <View style={{marginTop: 90}}>
          <WarningButton
            title="Change My Password"
            customClick={() => {
              changeMypassword(), soundEffectsUtil.touchableButtonSound();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  function renderUpdateInfoView() {
    return (
      <SafeAreaView>
        <View style={{marginTop: 50}}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#c2c2a3"
              onChangeText={value => setEmail(value)}
            />
          </View>

          <View style={{marginTop: -20, marginBottom: 20, marginLeft: 20}}>
            {Boolean(updateInfoErrorFlag.emailError) && (
              <Text style={{color: 'red'}}>
                {updateInfoErrorFlag.emailError}
              </Text>
            )}
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="First Name"
              placeholderTextColor="#c2c2a3"
              onChangeText={value => setFirstName(value)}
            />
          </View>

          <View style={{marginTop: -20, marginBottom: 20, marginLeft: 20}}>
            {Boolean(updateInfoErrorFlag.firstnameError) && (
              <Text style={{color: 'red'}}>
                {updateInfoErrorFlag.firstnameError}
              </Text>
            )}
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Last Name"
              placeholderTextColor="#c2c2a3"
              onChangeText={value => setLastName(value)}
            />
          </View>

          <View style={{marginTop: -20, marginBottom: 20, marginLeft: 20}}>
            {Boolean(updateInfoErrorFlag.lastnameError) && (
              <Text style={{color: 'red'}}>
                {updateInfoErrorFlag.lastnameError}
              </Text>
            )}
          </View>
        </View>

        <View style={{marginTop: 90}}>
          <WarningButton
            title="Update Me"
            customClick={() => {
              updateMyInformation(), soundEffectsUtil.touchableButtonSound();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <MenuProvider>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            marginRight: 20,
            // marginBottom: 20,
            backgroundColor: '#87bd83',
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
                tintColor: '#977746',
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
                    getGameProfile(), soundEffectsUtil.touchableButtonSound();
                  }}>
                  <Image
                    source={icons.menu_icon}
                    style={{
                      marginLeft: 5,
                      marginTop: 5,
                      height: 40,
                      width: 40,
                      tintColor: '#977746',
                    }}
                  />
                </MenuTrigger>
                <MenuOptions style={{backgroundColor: '#c2c2a3'}}>
                  <MenuOption
                    onSelect={() => {
                      setIsScoreBoardVisible(true),
                        findScores(),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                    style={{padding: 10}}>
                    <Image
                      source={icons.scoreboard}
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
                      Scores
                    </Text>
                  </MenuOption>

                  <MenuOption
                    onSelect={() => {
                      setIsProfileVisible(true),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                    style={{padding: 10}}>
                    <Image
                      source={icons.profiles}
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
                      Profiles
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

                  {isLoginUser ? (
                    <MenuOption
                      onSelect={() => {
                        setIsAccountVisible(true),
                          soundEffectsUtil.touchableButtonSound();
                      }}
                      style={{padding: 10}}>
                      <Image
                        source={icons.account}
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
                        Account
                      </Text>
                    </MenuOption>
                  ) : (
                    ''
                  )}
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </View>

        <View style={{flex: 1, backgroundColor: '#ddedea'}}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={images.logo}
              style={{
                width: '80%',
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: -200,
              }}
            />
            <Image source={images.carLogo} style={styles.carLogo} />

            <View style={{marginLeft: 125, marginRight: 125}}>
              <SuccessButton
                title="Play!"
                customClick={() => {
                  navigation.navigate('GameScreen'),
                    soundEffectsUtil.touchableButtonSound();
                }}
              />
            </View>

            {!isLoginUser ? (
              <View style={{marginLeft: 125, marginRight: 125, marginTop: 15}}>
                <WarningButton
                  title="Login"
                  customClick={() => {
                    navigation.navigate('LoginScreen'),
                      soundEffectsUtil.touchableButtonSound();
                  }}
                />
              </View>
            ) : (
              ''
            )}
          </View>
        </View>

        {/* Score board Model */}
        <Modal
          transparent={true}
          visible={isScoreBoardVisible}
          animationType={'slide'}>
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
                  setIsScoreBoardVisible(false),
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

              <Text style={{...FONTS.header2}}>Top Score</Text>
              <Text
                style={{
                  // ...FONTS.header3,
                  fontSize: 25,
                  marginTop: 30,
                  textAlign: 'center',
                  color: 'red',
                }}>
                {topScore}
              </Text>
              {isLoginUser ? (
                <View>
                  <Text style={{...FONTS.header2}}>Community</Text>

                  {/* 1st */}
                  <View
                    style={{
                      marginTop: 10,
                      backgroundColor: '#DAA520',
                      padding: 5,
                      alignContent: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      borderWidth: 1,
                    }}>
                    <Image
                      source={icons.medal_1}
                      style={{
                        // marginLeft: 1,
                        // marginTop: 5,
                        height: 50,
                        width: 50,
                      }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        marginTop: 10,
                        right: 15,
                        color: '#FFFFFF',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      Kevin - 2761
                    </Text>
                  </View>

                  {/* 2nd */}
                  <View
                    style={{
                      marginTop: 10,
                      backgroundColor: '#C0C0C0',
                      padding: 5,
                      alignContent: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      borderWidth: 1,
                    }}>
                    <Image
                      source={icons.medal_2}
                      style={{
                        // marginLeft: 1,
                        // marginTop: 5,
                        height: 50,
                        width: 50,
                      }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        marginTop: 10,
                        right: 15,
                        color: '#FFFFFF',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      Jhon - 1761
                    </Text>
                  </View>

                  {/* 3rd */}
                  <View
                    style={{
                      marginTop: 10,
                      backgroundColor: '#A0522D',
                      padding: 5,
                      alignContent: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      borderWidth: 1,
                    }}>
                    <Image
                      source={icons.medal_3}
                      style={{
                        // marginLeft: 1,
                        // marginTop: 5,
                        height: 50,
                        width: 50,
                      }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        marginTop: 10,
                        right: 15,
                        color: '#FFFFFF',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      Andrew - 973
                    </Text>
                  </View>
                </View>
              ) : (
                ''
              )}
            </View>
          </View>
        </Modal>

        {/* About Model */}
        <Modal
          transparent={true}
          visible={isAboutVisible}
          animationType={'slide'}>
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
                entertainment or fun. This Taxi driver is a fun game that you can play in your fun times. You can see your community places as well. We will provide more updates.
              </Text>

              <Text style={{marginTop: 10, textAlign: 'center'}}>
                Version: 1.0
              </Text>

            </View>
          </View>
        </Modal>

        {/* Share Model */}
        <Modal
          transparent={true}
          visible={isShareVisible}
          animationType={'slide'}>
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

        {/* Profile Model */}
        <Modal
          transparent={true}
          visible={isProfileVisible}
          animationType={'slide'}>
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
                  setIsProfileVisible(false),
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

              <Text style={{...FONTS.header1}}>Profiles</Text>

              <View style={{marginTop: 30, marginLeft: 30, marginRight: 30}}>
                {isEasy ? (
                  <SuccessButton
                    title="Easy"
                    customClick={() => {
                      setGameProfile(EASY_PROFILE.toString()),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                  />
                ) : (
                  <WarningButton
                    title="Easy"
                    customClick={() => {
                      isSetEasy(true);
                      isSetMedium(false),
                        isSetHard(false),
                        setGameProfile(EASY_PROFILE.toString()),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                  />
                )}
              </View>

              <View style={{marginTop: 20, marginLeft: 30, marginRight: 30}}>
                {isMedium ? (
                  <SuccessButton
                    title="Medium"
                    customClick={() => {
                      setGameProfile(MEDIUM_PROFILE.toString()),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                  />
                ) : (
                  <WarningButton
                    title="Medium"
                    customClick={() => {
                      isSetEasy(false);
                      isSetMedium(true),
                        isSetHard(false),
                        setGameProfile(MEDIUM_PROFILE.toString()),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                  />
                )}
              </View>

              <View style={{marginTop: 20, marginLeft: 30, marginRight: 30}}>
                {isHard ? (
                  <SuccessButton
                    title="Hard"
                    customClick={() => {
                      setGameProfile(HARD_PROFILE.toString()),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                  />
                ) : (
                  <WarningButton
                    title="Hard"
                    customClick={() => {
                      isSetEasy(false);
                      isSetMedium(false),
                        isSetHard(true),
                        setGameProfile(HARD_PROFILE.toString()),
                        soundEffectsUtil.touchableButtonSound();
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </Modal>

        {/* Account Model */}
        <Modal
          transparent={true}
          visible={isAccountVisible}
          animationType={'slide'}>
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <View
              style={{
                padding: 20,
                borderRadius: 20,
                height: '75%',
                marginLeft: 30,
                marginRight: 30,
                borderColor: '#73737',
                borderEndWidth: 2,
                backgroundColor: '#c2c2a3',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsAccountVisible(false),
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

              <Text style={{...FONTS.header1}}>Account Settings</Text>
              <Text
                style={{
                  ...FONTS.header3,
                  fontSize: 20,
                  marginTop: 30,
                  textAlign: 'center',
                }}>
                Your game is being saved. Here you can update your personal
                details and password.
              </Text>
              <Text
                style={{
                  ...FONTS.header3,
                  fontSize: 40,
                  marginTop: 30,
                  textAlign: 'center',
                }}>
                Dilshan
              </Text>
              <Text
                style={{
                  ...FONTS.header3,
                  fontSize: 20,
                  marginTop: 10,
                  textAlign: 'center',
                }}>
                uggdilshan.gmail.com
              </Text>
              <View style={{marginTop: 20, marginLeft: 70, marginRight: 70}}>
                <WarningButton
                  title="Update"
                  customClick={() => {
                    setIsUpdateInfoScreenVisible(true),
                      soundEffectsUtil.touchableButtonSound();
                  }}
                />
              </View>

              <View style={{marginTop: 50}}>
                <View
                  style={{
                    borderBottomColor: '#595959',
                    borderBottomWidth: 1,
                  }}
                />
                <LineButton
                  title="Change Password"
                  customClick={() => {
                    setIsChangePasswordScreenVisible(true),
                      soundEffectsUtil.touchableButtonSound();
                  }}
                />
                <View
                  style={{
                    borderBottomColor: '#595959',
                    borderBottomWidth: 1,
                  }}
                />
                <LineButton
                  title="Logout"
                  customClick={() => {
                    setIsLogoutScreenVisible(true),
                      soundEffectsUtil.touchableButtonSound();
                  }}
                />
                <View
                  style={{
                    borderBottomColor: '#595959',
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* Logout Model */}
        <Modal
          transparent={true}
          visible={isLogoutScreenVisible}
          animationType={'slide'}>
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <View
              style={{
                padding: 20,
                borderRadius: 20,
                height: '75%',
                marginLeft: 30,
                marginRight: 30,
                borderColor: '#73737',
                borderEndWidth: 2,
                backgroundColor: '#c2c2a3',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsLogoutScreenVisible(false),
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

              <Text style={{...FONTS.header1}}>Are you sure?</Text>
              <Text
                style={{
                  ...FONTS.header3,
                  fontSize: 25,
                  marginTop: 30,
                  textAlign: 'center',
                  color: 'red',
                }}>
                If you logout from here you can play the game offline.
              </Text>
              <Image
                source={images.goodBye}
                style={{
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  marginLeft: 50,
                  marginTop: 80,
                  height: 130,
                  width: 200,
                }}
              />
              <View style={{marginTop: 110}}>
                <WarningButton
                  title="Logout Me"
                  customClick={() => {
                    logoutMe(), soundEffectsUtil.touchableButtonSound();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* Change password Model */}
        <Modal
          transparent={true}
          visible={isChangePasswordScreenVisible}
          animationType={'slide'}>
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <View
              style={{
                padding: 20,
                borderRadius: 20,
                height: '75%',
                marginLeft: 30,
                marginRight: 30,
                borderColor: '#73737',
                borderEndWidth: 2,
                backgroundColor: '#c2c2a3',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setresetPerrorFlag({});
                  setIsChangePasswordScreenVisible(false),
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

              <Text style={{...FONTS.header1}}>Change Password</Text>

              <ScrollView>{renderReEnterPasswordView()}</ScrollView>
            </View>
          </View>
        </Modal>

        {/*Update information  */}
        <Modal
          transparent={true}
          visible={isUpdateInfoScreenVisible}
          animationType={'slide'}>
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <View
              style={{
                padding: 20,
                borderRadius: 20,
                height: '75%',
                marginLeft: 30,
                marginRight: 30,
                borderColor: '#73737',
                borderEndWidth: 2,
                backgroundColor: '#c2c2a3',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setupdateInfoErrorFlag({});
                  setIsUpdateInfoScreenVisible(false),
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

              <Text style={{...FONTS.header1}}>Update Information</Text>

              <ScrollView>{renderUpdateInfoView()}</ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </MenuProvider>
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
  carLogo: {
    height: 150,
    // width: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -250,
    marginBottom:40
    // flex: 1,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});

export default HomeScreen;
