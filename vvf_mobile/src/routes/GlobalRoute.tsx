import React from 'react';
import AuthRoute from './AuthRoute';
import WelcomeScreen from '../ui/welcome/WelcomScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {storagePropertiesName} from '@constants';
import MainRoute from './MainRoute';
import {mmkvStorage} from '@libs/mmvkStorage';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {GlobalStackParamList} from '@custom-types/navigationType';
import {useSelector} from 'react-redux';
import {RootState} from '@libs/redux/store';

const Stack = createNativeStackNavigator<GlobalStackParamList>();

const GlobalRoute: React.FC = () => {
  const [shouldWelcome, _] = useMMKVStorage(
    storagePropertiesName.isFristTime,
    mmkvStorage,
    true,
  );
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        statusBarStyle: theme.value === 'light' ? 'dark' : 'light',
      }}
      initialRouteName={shouldWelcome ? 'Welcome' : 'Main'}>
      <Stack.Screen name="Auth" component={AuthRoute} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Main" component={MainRoute} />
    </Stack.Navigator>
  );
};

export default GlobalRoute;
