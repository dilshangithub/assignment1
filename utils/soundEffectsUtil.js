import Sound from 'react-native-sound';
import React, {useState} from 'react';

var backgroundSound = null;
var btnSound = null;
var crashed = null;

var isMute = false;

function touchableButtonSound() {
  Sound.setCategory('Playback');

  btnSound = new Sound('button_click.wav', Sound.MAIN_BUNDLE, error => {
    if (isMute) {
      btnSound.setVolume(0);
    }
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    btnSound.play();
  });
}

function backgroundSoundEffect() {
  Sound.setCategory('Playback');

  backgroundSound = new Sound('landing_audio.mp3', Sound.MAIN_BUNDLE, error => {
    backgroundSound.setVolume(0.4);

    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    backgroundSound.setNumberOfLoops(-1);
    backgroundSound.play();
  });
}

function crashedSound() {
  Sound.setCategory('Playback');

  crashed = new Sound('crashed.mp3', Sound.MAIN_BUNDLE, error => {
    if (isMute) {
      crashed.setVolume(0);
    }
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    crashed.play();
  });
}

function startPlaying() {
  backgroundSound.play();
  isMute = false;
}

function stopPlaying() {
  backgroundSound.pause();
  isMute = true;
}

const soundEffectsUtil = {
  touchableButtonSound,
  backgroundSoundEffect,
  crashedSound,
  startPlaying,
  stopPlaying,
};

export default soundEffectsUtil;
