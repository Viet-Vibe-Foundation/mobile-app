import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import {storagePropertiesName} from '../../../constants';
import {User} from '@data/user';
import {useTranslation} from 'react-i18next';
import UserInfoComponent from './components/UserInfoComponent';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from 'src/libs/mmvkStorage';
import FilledButtonComponent from '@components/FilledButtonComponent';
import {useNavigation} from '@react-navigation/native';

const SettingScreen = () => {
  const {t} = useTranslation();
  const [user, setUser] = useMMKVStorage<User | null>(
    storagePropertiesName.userInfo,
    mmkvStorage,
    null,
  );
  const [_, setAuthToken] = useMMKVStorage<string | null>(
    storagePropertiesName.authToken,
    mmkvStorage,
    null,
  );
  const navigate = useNavigation<any>();

  const handleLogout = () => {
    if (!user) return;
    setUser(null);
    setAuthToken(null);
    navigate.navigate('Auth');
  };

  const handleLogin = () => {
    navigate.navigate('Auth');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {user != null ? (
            <UserInfoComponent
              name={user.name ?? 'N/a'}
              email={user.email ?? 'N/a'}
              image={user.image ?? 'N/a'}
            />
          ) : null}

          <View style={styles.optionContainer}>
            {user ? (
              <FilledButtonComponent
                title="Your profile"
                onPress={() => navigate.navigate('UserProfile')}
              />
            ) : null}
            <FilledButtonComponent
              title={user ? 'Logout' : 'Login'}
              onPress={user ? handleLogout : handleLogin}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  optionContainer: {
    marginTop: 10,
    gap: 10,
    borderRadius: 20,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    shadowOpacity: 0.1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default SettingScreen;
