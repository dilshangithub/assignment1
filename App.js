import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import KeepAwake from 'react-native-keep-awake';

import WelcomScreen from './screens/Home/welcomeScreen';
import HomeScreen from './screens/Home/homeScreen';
import GameScreen from './screens/Game/gameScreen';
import LoginScreen from './screens/Auth/loginScreen';
import SignupScreen from './screens/Auth/signupScreen';
import ForgotPasswordScreen from './screens/Auth/forgotpasswordScreen';
import soundEffectsUtil from './utils/soundEffectsUtil';

const Stack = createStackNavigator();

KeepAwake.activate();

const App = () => {

  //handle app states -> background and foground
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        console.log('Next AppState is: ', nextAppState);
        if (nextAppState === 'background') {
          soundEffectsUtil.stopPlaying();
        } else if (nextAppState === 'active') {
          soundEffectsUtil.startPlaying();
        }
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="WelcomScreen"
          component={WelcomScreen}
          options={{
            title: ' ', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
