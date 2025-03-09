import React from 'react';
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';  
import AuthRoute from './AuthRoute';
import WelcomeScreen from '../ui/welcome/WelcomScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {storagePropertiesName} from '../constants';
import MainRoute from './MainRoute';

const Stack = createNativeStackNavigator();

const GlobalRoute: React.FC = () => {
  const [isFirstTime] = useMMKVBoolean(storagePropertiesName.isFristTime);
  const [isAuthenticated] = useMMKVObject(storagePropertiesName.user);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        !isFirstTime ? 'Welcome' : isAuthenticated ? 'Auth' : 'Main'
      }>
      <Stack.Screen name="Auth" component={AuthRoute} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Main" component={MainRoute} />
    </Stack.Navigator>
  );
};

export default GlobalRoute;
