/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import './src/libs/navigations/gesture-handler';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
