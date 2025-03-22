import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Divider from '../components/Divider';
import TextInputComponent from '../components/TextInputComponent';
import FilledButtonComponent from '../components/FilledButtonComponent';
import {appColor, appInfo, storagePropertiesName} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from 'src/services/apis/axios';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import AuthHeaderComponent from './components/AuthHeaderComponent';
import {decodeToken} from 'react-jwt';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from 'src/libs/mmvkStorage';
import {User} from 'src/data/user';

const SignInForm: React.FC = () => {
  const navigation = useNavigation<any>();
  const [_, setAuthToken] = useMMKVStorage(
    storagePropertiesName.authToken,
    mmkvStorage,
    '',
  );
  const [__, setUser] = useMMKVStorage<User | null>(
    storagePropertiesName.userInfo,
    mmkvStorage,
    null,
  );
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handelLogin = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        throw new Error(`${t('email_password_required')}`);
      } else if (!email.match(appInfo.emailRegex)) {
        throw new Error(`${t('email_not_formatted')}`);
      } else if (password.length < 8) {
        throw new Error(`${t('password_8_character')}`);
      }
      const req = {
        email,
        password,
      };

      console.log(req);
      const res = await axiosInstance.post('/auth/signin', req);
      if (res.data) {
        setAuthToken(res.data.token);
        const decoded = decodeToken<any>(res.data.token);
        setUser(decoded.data);
        navigation.replace('Main');
      } else {
        setError(`${t('un_expected_error')}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`${t('un_expected_error')}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeaderComponent
        subTitle={t('login_to_your_account_to_book_event_tickets_or_lessons')}
        title={t('login')}
      />
      <Divider type="horizontal" />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInputComponent
          placeHolder="JohnSmith@gmail.com"
          type="normal"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Password</Text>
        <TextInputComponent
          placeHolder={t('enter_your_passowrd')}
          type="password"
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.errorText}>{error}</Text>
      <FilledButtonComponent
        title="Login"
        loading={isLoading}
        style={styles.loginButton}
        onPress={handelLogin}
      />
      {/* <FilledButtonComponent
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
      /> */}

      <Text style={styles.textOr}>{t('or')}</Text>
      <View style={styles.textSignUpContainer}>
        <Text>{t('dont_have_account')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textLinkSignUp}>{t('sign_up')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: 'whitesmoke',
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
