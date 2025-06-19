/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import '@libs/navigations/gesture-handler';
import {name as appName} from './app.json';
import './i18config';

AppRegistry.registerComponent(appName, () => App);
