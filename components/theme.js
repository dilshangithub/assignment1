import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const FONTS = {
  KidsEdition: {fontFamily: 'Kids Edition', lineHeight: 36},
  DrStronge: {fontFamily: 'Dr.Stronge', lineHeight: 36},
  button: {
    fontFamily: 'Kids Edition',
    color: '#ffffff',
    fontSize: 20,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  // h4: { fontFamily: "Roboto-Bold", lineHeight: 22 },
  header1: {
    fontFamily: 'Dr.Stronge',
    textAlign: 'center',
    fontSize: 45,
    letterSpacing: 1,
  },
  header2: {
    fontFamily: 'Dr.Stronge',
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 2,
  },
  header3: {
    fontFamily: 'Dr.Stronge',
    fontSize: 18,
    letterSpacing: 1,
  },
  // body4: { fontFamily: "Dr.Stronge", lineHeight: 22 },
  // body5: { fontFamily: "Dr.Stronge", lineHeight: 22 },
};
