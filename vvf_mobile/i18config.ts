import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import enError from './src/locales/en/error.json';
import enEvent from './src/locales/en/event.json';
import enSearch from './src/locales/en/search.json';
import enSignIn from './src/locales/en/signIn.json';
import enSignUp from './src/locales/en/signUp.json';
import enSetting from './src/locales/en/setting.json';
import enHome from './src/locales/en/home.json';
import viError from './src/locales/vi/error.json';
import viEvent from './src/locales/vi/event.json';
import viSearch from './src/locales/vi/search.json';
import viSignIn from './src/locales/vi/signIn.json';
import viSignUp from './src/locales/vi/signUp.json';
import viHome from './src/locales/vi/home.json';
import viSetting from './src/locales/vi/setting.json';

export const i18Instance = i18next.use(initReactI18next).init({
  lng: 'vi',
  debug: true,
  resources: {
    en: {
      translation: {
        ...enError,
        ...enEvent,
        ...enSearch,
        ...enSignIn,
        ...enSignUp,
        ...enHome,
        ...enSetting,
      },
    },
    vi: {
      translation: {
        ...viError,
        ...viEvent,
        ...viSearch,
        ...viSignIn,
        ...viSignUp,
        ...viHome,
        ...viSetting,
      },
    },
  },
});
