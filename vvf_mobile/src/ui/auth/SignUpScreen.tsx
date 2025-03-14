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
} from 'react-native';
import React from 'react';
import {appColor} from '../../constants';
import Divider from '../components/Divider';
import TextInputComponent from '../components/TextInputComponent';
import FilledButtonComponent from '../components/FilledButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AuthHeaderComponent from './components/AuthHeaderComponent';

const SignUpForm: React.FC = () => {
  const navigation = useNavigation<any>();
  const {t} = useTranslation();
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
              onChangeText={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('last_name')}</Text>
            <TextInputComponent
              placeHolder="eg: Smith"
              type="normal"
              onChangeText={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInputComponent
              placeHolder="JohnSmith@gmail.com"
              type="normal"
              onChangeText={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('age')}</Text>
            <TextInputComponent
              placeHolder="eg: 26"
              type="normal"
              onChangeText={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('phoneNumber')}</Text>
            <TextInputComponent
              placeHolder="eg: 1234567890"
              type="normal"
              onChangeText={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('address')}</Text>
            <TextInputComponent
              placeHolder="eg: 123 Main St"
              type="normal"
              onChangeText={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('pasword')}</Text>
            <TextInputComponent
              placeHolder={t('enter_your_password')}
              type="password"
              onChangeText={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{t('confirm_password')}</Text>
            <TextInputComponent
              placeHolder={t('enter_your_password')}
              type="password"
              onChangeText={() => {}}
            />
          </View>
          <FilledButtonComponent
            style={styles.signUpBtn}
            onPress={() => {}}
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
    paddingTop: 30,
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
});

export default SignUpForm;
