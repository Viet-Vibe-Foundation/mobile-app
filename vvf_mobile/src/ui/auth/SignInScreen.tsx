import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Divider from '@components/Divider';
import TextInputComponent from '@components/TextInputComponent';
import FilledButtonComponent from '@components/FilledButtonComponent';
import {regex, storagePropertiesName} from '@constants';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '@libs/apis/axios';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import AuthHeaderComponent from './components/AuthHeaderComponent';
import {decodeToken} from 'react-jwt';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '@libs/mmvkStorage';
import {User} from '@data/user';
import {useDispatch} from 'react-redux';
import {AuthState, login} from '@libs/redux/authSlice';
import {appColor} from '@styles/appColor';
import {useAppColor} from 'src/hooks/useAppColor';

const SignInForm: React.FC = () => {
  const theme = useAppColor();
  const navigation = useNavigation<any>();
  const [_, setAuthToken] = useMMKVStorage<string | null>(
    storagePropertiesName.authToken,
    mmkvStorage,
    null,
  );
  const [__, setUser] = useMMKVStorage<User | null>(
    storagePropertiesName.userInfo,
    mmkvStorage,
    null,
  );
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handelLogin = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        throw new Error(`${t('email_password_required')}`);
      } else if (!email.match(regex.emailRegex)) {
        throw new Error(`${t('email_not_formatted')}`);
      } else if (password.length < 8) {
        throw new Error(`${t('password_8_character')}`);
      }
      const req = {
        email,
        password,
      };

      const res = await axiosInstance.post('/auth/m/signin', req);
      if (res.data) {
        dispatch(
          login({
            authToken: res.data.token,
            isAuth: true,
          } as AuthState),
        );
        setAuthToken(res.data.token);
        const decoded = decodeToken<User>(res.data.token);
        setUser(decoded);
        navigation.goBack();
      } else {
        setError(`${t('un_expected_error')}`);
      }
    } catch (er: unknown) {
      if (axios.isAxiosError(er)) {
        setError(er.response?.data.message);
      } else if (er instanceof Error) {
        setError(er.message);
      } else {
        setError(`${t('un_expected_error')}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View
          style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
          <AuthHeaderComponent
            subTitle={t(
              'login_to_your_account_to_book_event_tickets_or_lessons',
            )}
            title={t('login')}
          />
          <Divider type="horizontal" />
          <View style={styles.inputContainer}>
            <Text style={[styles.inputTitle]}>Email</Text>
            <TextInputComponent
              value={email}
              placeHolder="JohnSmith@gmail.com"
              type="normal"
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInputComponent
              value={password}
              placeHolder={t('enter_your_passowrd')}
              type="password"
              onChangeText={setPassword}
            />
          </View>
          <Text style={[styles.errorText, {color: theme.textError}]}>
            {error}
          </Text>
          <FilledButtonComponent
            title="Login"
            loading={isLoading}
            style={styles.loginButton}
            onPress={handelLogin}
          />

          <Text style={[styles.textOr, {color: theme.onPrimary}]}>
            {t('or')}
          </Text>
          <View style={styles.textSignUpContainer}>
            <Text style={{color: theme.onPrimary}}>
              {t('dont_have_account')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.textLinkSignUp}>{t('sign_up')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
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
    fontSize: 18,
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
  },
});

export default SignInForm;
