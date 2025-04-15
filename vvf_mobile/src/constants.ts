import {ViewStyle} from 'react-native';

export const appColor = {
  primaryColor: '#C54B3E',
  textSecondary: 'grey',
  toolBarColor: '#fff',
  disabledColor: '#cccccc',
  disabledTextColor: '#777777',
};

export const storagePropertiesName = {
  isFristTime: 'isFirstTime',
  authToken: 'authToken',
  userInfo: 'user',
};
export const appInfo = {
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phoneRegex: /^\d{10}$/,
};

export const languageList = [
  {
    label: 'Việt Nam',
    value: 'vi',
    image: require('@assets/icons/vietnam-flag-icon.svg'),
  },
  {
    label: 'English',
    value: 'en',
    image: require('@assets/icons/united-kingdom-flag-icon.svg'),
  },
];

export const cardStyles: ViewStyle = {
  alignItems: 'center',
  gap: 15,
  borderRadius: 20,
  width: '100%',
  padding: 15,
  backgroundColor: 'white',
  elevation: 5,
  shadowOpacity: 0.1,
};
