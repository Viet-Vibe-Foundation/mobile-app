import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInForm from '../ui/auth/SignInScreen';
import SignUpForm from '../ui/auth/SignUpScreen';
import {AuthStackParamList} from '@custom-types/navigationType';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthRoute: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false, statusBarTranslucent: true}}>
      <Stack.Screen name="SignIn" component={SignInForm} />
      <Stack.Screen name="SignUp" component={SignUpForm} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
