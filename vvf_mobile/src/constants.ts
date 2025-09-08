export const storagePropertiesName = {
  isFristTime: 'isFirstTime',
  authToken: 'authToken',
  userInfo: 'user',
};
export const regex = {
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phoneRegex: /^\d{10}$/,
};

export const languageList = [
  {
    label: 'Việt Nam',
    value: 'vi',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Français (Canadian)',
    value: 'fr',
  },
];

export const socialButtonData = [
  {
    platform: 'facebook',
    label: 'Facebook',
    icon: require('@assets/icons/fb_icon.svg'),
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    icon: require('@assets/icons/insta_icon.svg'),
  },
];

export const themeButtonData = [
  {
    themeMode: 'dark',
    icon: 'light-mode',
    color: 'yellow',
  },
  {
    themeMode: 'light',
    icon: 'dark-mode',
    color: 'grey',
  },
];
