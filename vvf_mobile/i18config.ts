import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import enError from '@locales/en/error.json';
import enEvent from '@locales/en/event.json';
import enSearch from '@locales/en/search.json';
import enSignIn from '@locales/en/signIn.json';
import enSignUp from '@locales/en/signUp.json';
import enMore from '@locales/en/more.json';
import enHome from '@locales/en/home.json';
import viError from '@locales/vi/error.json';
import viEvent from '@locales/vi/event.json';
import viSearch from '@locales/vi/search.json';
import viSignIn from '@locales/vi/signIn.json';
import viSignUp from '@locales/vi/signUp.json';
import viHome from '@locales/vi/home.json';
import viMore from '@locales/vi/more.json';
import frError from '@locales/fr/error.json';
import frEvent from '@locales/fr/event.json';
import frSearch from '@locales/fr/search.json';
import frSignIn from '@locales/fr/signIn.json';
import frSignUp from '@locales/fr/signUp.json';
import frHome from '@locales/fr/home.json';
import frMore from '@locales/fr/more.json';

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
        ...enMore,
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
        ...viMore,
      },
    },
    fr: {
      translation: {
        ...frError,
        ...frEvent,
        ...frSearch,
        ...frSignIn,
        ...frSignUp,
        ...frHome,
        ...frMore,
      },
    },
  },
});
