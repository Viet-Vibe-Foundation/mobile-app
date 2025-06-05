import {Linking, Platform} from 'react-native';

const openFacebook = () => {
  const fbAppUrl = Platform.select({
    android: 'fb://page/61570910920072',
    ios: 'fb://profile/61570910920072',
  });
  if (!fbAppUrl) {
    return;
  }
  const fbWebUrl = 'https://m.facebook.com/61570910920072/';
  Linking.openURL(fbAppUrl).catch(() => Linking.openURL(fbWebUrl));
};

const openInstagram = () => {
  const instaAppUrl = 'instagram://user?username=vietvibe.foundation';
  const instaWebUrl = 'https://www.instagram.com/vietvibe.foundation/';
  Linking.openURL(instaAppUrl).catch(() => Linking.openURL(instaWebUrl));
};

export {openFacebook, openInstagram};
