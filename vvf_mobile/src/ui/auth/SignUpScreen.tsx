import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {appColor} from '../../constants';
import Divider from '../components/Divider';
import TextInputComponent from '../components/TextInputComponent';
import FilledButtonComponent from '../components/FilledButtonComponent';
import {useNavigation} from '@react-navigation/native';

const SignUpForm: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text>Let us get you all set up.</Text>
      <Divider type="horizontal" />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>First Name</Text>
        <TextInputComponent placeHolder="eg: Joe" type="normal" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Last Name</Text>
        <TextInputComponent placeHolder="eg: Smith" type="normal" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInputComponent placeHolder="JohnSmith@gmail.com" type="normal" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Age</Text>
        <TextInputComponent placeHolder="eg: 26" type="normal" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Phone Number</Text>
        <TextInputComponent placeHolder="eg: 1234567890" type="normal" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Address</Text>
        <TextInputComponent placeHolder="eg: 123 Main St" type="normal" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Password</Text>
        <TextInputComponent placeHolder="Enter your password" type="password" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Confirm Password</Text>
        <TextInputComponent placeHolder="Confirm password" type="password" />
      </View>
      <FilledButtonComponent
        style={styles.signUpBtn}
        onPress={() => {}}
        title="Create account"
      />
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
