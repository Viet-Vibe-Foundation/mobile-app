import {View, StyleSheet} from 'react-native';
import React from 'react';
import {storagePropertiesName} from '@constants';
import {User} from '@data/user';
import {useTranslation} from 'react-i18next';
import UserInfoComponent from './components/UserInfoComponent';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '@libs/mmvkStorage';
import FilledButtonComponent from '@components/FilledButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {toggleLanguageModal} from '@libs/redux/languageModalSlice';
import SocialContactComponent from './components/SocialContactComponent';
import {cardStyles} from '@styles/cardStyles';

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
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (!user) {
      return;
    }
    setUser(null);
    setAuthToken(null);
    navigate.navigate('Auth');
  };

  const handleLogin = () => {
    navigate.navigate('Auth');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.userInfoCard}>
        {user != null ? (
          <UserInfoComponent
            name={user.name ?? 'N/a'}
            email={user.email ?? 'N/a'}
            image={user.image ?? 'N/a'}
          />
        ) : null}

        <View style={[cardStyles, styles.optionContainer]}>
          {user ? (
            <FilledButtonComponent
              title={t('your_profile')}
              onPress={() => navigate.navigate('UserProfile')}
            />
          ) : null}
          <FilledButtonComponent
            onPress={() => dispatch(toggleLanguageModal())}
            title={t('language')}
          />
          <FilledButtonComponent
            title={user ? t('logout') : t('login')}
            onPress={user ? handleLogout : handleLogin}
          />
        </View>
      </View>
      <SocialContactComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  userInfoCard: {
    alignItems: 'center',
    gap: 10,
  },
  optionContainer: {
    width: '100%',
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
