import Sound from 'react-native-sound';

function touchableButtonSound() {
  Sound.setCategory('Playback');

  var btnSound = new Sound('button_click.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    btnSound.play();
  });
}

function backgroundSoundEffect() {
  Sound.setCategory('Playback');

  var backgroundSound = new Sound('landing_audio.mp3', Sound.MAIN_BUNDLE, error => {
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

  var crashed = new Sound('crashed.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    crashed.play();
  });
}

const soundEffectsUtil = {
  touchableButtonSound,
  backgroundSoundEffect,
  crashedSound
};

export default soundEffectsUtil;
