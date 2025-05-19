import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableNativeFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {appColor, appInfo} from '@constants';
import Divider from '../components/Divider';
import TextInputComponent from '../components/TextInputComponent';
import FilledButtonComponent from '../components/FilledButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AuthHeaderComponent from './components/AuthHeaderComponent';
import axios from 'axios';
import axiosInstance from 'src/services/apis/axios';

const SignUpForm: React.FC = () => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignUp = async () => {
    try {
      if (
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !age ||
        !address ||
        !confirmPassword
      ) {
        throw new Error(t('email_password_required'));
      } else if (!email.match(appInfo.emailRegex)) {
        throw new Error(t('email_not_formatted'));
      } else if (password.length < 8) {
        throw new Error(t('password_8_character'));
      } else if (password !== confirmPassword) {
        throw new Error(t('password_not_matched'));
      } else if (address.length < 6) {
        throw new Error(t('address_6_character'));
      }
      const reqData = {
        firstName,
        lastName,
        email,
        age: String(age),
        phoneNumber,
        address,
        password,
        confirmPassword,
      };
      const res = await axiosInstance.post('/auth/m/signup', reqData);

      if (res.status === 201) {
        Alert.alert(
          'Notification',
          'Sign Up successfully, please check your email to verify',
          [{text: 'OK', onPress: () => navigation.goBack()}],
        );
      }
    } catch (error: any) {
      let message: string = t('un_expected_error');
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setErrorMessage(message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.container}>
          <AuthHeaderComponent
            subTitle={t('let_us_get_you_all_set_up')}
            title={t('sign_up')}
          />
          <Divider type="horizontal" />
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('first_name')}</Text>
            <TextInputComponent
              placeHolder="eg: Joe"
              type="normal"
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('last_name')}</Text>
            <TextInputComponent
              placeHolder="eg: Smith"
              type="normal"
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInputComponent
              placeHolder="JohnSmith@gmail.com"
              type="normal"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('age')}</Text>
            <TextInputComponent
              placeHolder="eg: 26"
              type="normal"
              keyboardType="numeric"
              onChangeText={text => setAge(Number(text))}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('phoneNumber')}</Text>
            <TextInputComponent
              placeHolder="eg: 1234567890"
              type="normal"
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('address')}</Text>
            <TextInputComponent
              placeHolder="eg: 123 Main St"
              type="normal"
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('password')}</Text>
            <TextInputComponent
              placeHolder={t('enter_your_passowrd')}
              type="password"
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('confirm_password')}</Text>
            <TextInputComponent
              placeHolder={t('enter_your_passowrd')}
              type="password"
              onChangeText={setConfirmPassword}
            />
          </View>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <FilledButtonComponent
            style={styles.signUpBtn}
            onPress={handleSignUp}
            title={t('create_account')}
          />
          <View style={styles.textSignUpContainer}>
            <Text>{t('already_have_account')} </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.textLinkSignUp}>{t('login')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: 'whitesmoke',
    marginBottom: 30,
  },

  inputContainer: {
    marginVertical: 5,
    gap: 5,
    justifyContent: 'flex-start',
  },
  inputTitle: {
    color: appColor.primaryColor,
  },
  signUpBtn: {
    marginTop: 10,
  },
  textSignUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  textLinkSignUp: {color: appColor.primaryColor, fontWeight: 'bold'},
  errorText: {
    marginTop: 5,
    fontSize: 15,
    color: 'red',
  },
});

export default SignUpForm;
