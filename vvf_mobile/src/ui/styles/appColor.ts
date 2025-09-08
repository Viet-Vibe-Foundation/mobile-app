import {DefaultTheme, DarkTheme} from '@react-navigation/native';

const primaryColor = '#C54B3E';
const textSecondary = 'grey';
const toolBarColor = '#fff';
const disabledColor = '#cccccc';

export const appColor = {
  primaryColor: primaryColor,
  textSecondary: textSecondary,
  toolBarColor: toolBarColor,
  disabledColor: disabledColor,
  disabledTextColor: disabledColor,
  light: {
    ...DefaultTheme,
    backgroundColor: '#F5F5F5',
    cardColor: '#FFFFFF',
    onPrimary: 'black',
    buttonPrimary: primaryColor,
    buttonDisabled: disabledColor,
    headerColor: 'white',
    primaryColor: primaryColor,
    textSecondary: textSecondary,
    textError: '#B00020',
    textfield: {
      textInput: 'black',
      placeHolder: '#FFFFFF',
      placeHolderText: 'gray',
      border: 'black',
    },
  },
  dark: {
    ...DarkTheme,
    backgroundColor: '#121212',
    cardColor: '#1E1E1E',
    onPrimary: '#FFFFFF',
    buttonPrimary: '#C54B3E',
    buttonDisabled: '#333333',
    headerColor: '#1A1A1A',
    primaryColor: '#C54B3E',
    textSecondary: '#BBBBBB',
    textError: '#B00020',
    textfield: {
      textInput: '#E0E0E0',
      placeHolder: '#CCCCCC',
      placeHolderText: '#888888',
      border: '#333333',
    },
  },
};
