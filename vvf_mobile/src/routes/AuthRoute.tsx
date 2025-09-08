import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInForm from '../ui/auth/SignInScreen';
import SignUpForm from '../ui/auth/SignUpScreen';
import {AuthStackParamList} from '@custom-types/navigationType';
import {useSelector} from 'react-redux';
import {RootState} from '@libs/redux/store';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthRoute: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        statusBarStyle: theme.value === 'light' ? 'dark' : 'light',
        statusBarTranslucent: true,
      }}>
      <Stack.Screen name="SignIn" component={SignInForm} />
      <Stack.Screen name="SignUp" component={SignUpForm} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
