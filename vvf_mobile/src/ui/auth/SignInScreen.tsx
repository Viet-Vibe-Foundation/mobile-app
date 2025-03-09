import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Divider from '../components/Divider';
import TextInputComponent from '../components/TextInputComponent';
import FilledButtonComponent from '../components/FilledButtonComponent';
import {appColor} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const SignInForm: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text>Login to your account to book event tickets or lessons</Text>
      <Divider type="horizontal" />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInputComponent placeHolder="JohnSmith@gmail.com" type="normal" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Password</Text>
        <TextInputComponent placeHolder="Enter Your Password" type="password" />
      </View>
      <FilledButtonComponent
        title="Login"
        style={styles.loginButton}
        onPress={() => navigation.navigate('Main')}
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
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignContent: 'center',
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
});

export default SignInForm;
