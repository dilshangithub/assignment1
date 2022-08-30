import Sound from 'react-native-sound';

function touchableButtonSound() {
  Sound.setCategory('Playback');

  var btnSound = new Sound('button_click.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
      btnSound.getDuration() +
        'number of channels: ' +
        btnSound.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    btnSound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
}

function backgroundSoundEffect() {
  Sound.setCategory('Playback');

  var backgroundSound = new Sound('landing_audio.mp3', Sound.MAIN_BUNDLE, error => {
    backgroundSound.setVolume(0.1);

    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
      backgroundSound.getDuration() +
        'number of channels: ' +
        backgroundSound.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    backgroundSound.setNumberOfLoops(-1);
    backgroundSound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
}

const soundEffectsUtil = {
  touchableButtonSound,
  backgroundSoundEffect,
};

export default soundEffectsUtil;
