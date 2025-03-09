import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInForm from '../ui/auth/SignInScreen';
import SignUpForm from '../ui/auth/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthRoute: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignInForm} />
      <Stack.Screen name="SignUp" component={SignUpForm} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
