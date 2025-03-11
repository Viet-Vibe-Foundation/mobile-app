import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Divider from '../components/Divider';
import TextInputComponent from '../components/TextInputComponent';
import FilledButtonComponent from '../components/FilledButtonComponent';
import {appColor, appInfo, storagePropertiesName} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from 'src/services/apis/axios';
import axios, {AxiosError} from 'axios';
import {useMMKVString} from 'react-native-mmkv';

const SignInForm: React.FC = () => {
  const navigation = useNavigation<any>();
  const [authToken, setAuthToken] = useMMKVString(
    storagePropertiesName.authToken,
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handelLogin = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        throw new Error('Email and passowrd is required');
      } else if (!email.match(appInfo.emailRegex)) {
        throw new Error('Email is not formatted');
      } else if (password.length < 8) {
        throw new Error('Password must be at lease 8 characters');
      }
      const req = {
        email,
        password,
      };
      const res = await axiosInstance.post('/auth/signin', req);
      if (res.data) {
        setAuthToken(res.data.token);
        navigation.replace('Main');
      } else {
        setError('Un-expected error. Please try again');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Un-expected error. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text>Login to your account to book event tickets or lessons</Text>
      <Divider type="horizontal" />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInputComponent
          placeHolder="JohnSmith@gmail.com"
          type="normal"
          onChange={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Password</Text>
        <TextInputComponent
          placeHolder="Enter Your Password"
          type="password"
          onChange={setPassword}
        />
      </View>
      <Text style={styles.errorText}>{error}</Text>
      <FilledButtonComponent
        title="Login"
        loading={isLoading}
        style={styles.loginButton}
        onPress={handelLogin}
      />
      <FilledButtonComponent
        title="Login"
        style={styles.loginButton}
        onPress={() => {}}
      />
      <FilledButtonComponent
        title="Login"
        style={styles.loginButton}
        onPress={() => {}}
      />
      <FilledButtonComponent
        title="Login"
        style={styles.loginButton}
        onPress={() => {}}
      />

      <Text style={styles.textOr}>Or</Text>
      <View style={styles.textSignUpContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textLinkSignUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: 'whitesmoke',
  },
  title: {
    textAlign: 'left',
    fontSize: 30,
    color: appColor.primaryColor,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 20,
    color: appColor.textSecondary,
  },

  inputContainer: {
    marginVertical: 5,
    gap: 5,
    justifyContent: 'flex-start',
  },
  inputTitle: {
    color: appColor.primaryColor,
  },
  loginButton: {
    marginTop: 10,
  },
  textOr: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  textSignUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textLinkSignUp: {color: appColor.primaryColor, fontWeight: 'bold'},
  errorText: {
    fontSize: 15,
    color: 'red',
  },
});

export default SignInForm;
