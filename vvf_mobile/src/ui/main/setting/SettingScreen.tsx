import {View, StyleSheet} from 'react-native';
import React from 'react';
import {storagePropertiesName} from '@constants';
import {User} from '@data/user';
import {useTranslation} from 'react-i18next';
import UserInfoComponent from './components/UserInfoComponent';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '@libs/mmvkStorage';
import FilledButtonComponent from '@components/FilledButtonComponent';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {toggleLanguageModal} from '@libs/redux/languageModalSlice';
import SocialContactComponent from './components/SocialContactComponent';
import {cardStyles} from '@styles/cardStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GlobalStackParamList,
  MainStackParamList,
} from '@custom-types/navigationType';
import {logout} from '@libs/redux/authSlice';
import {useAppColor} from 'src/hooks/useAppColor';

type MainNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Index'
>;

type GlobalNavigationProp = NativeStackNavigationProp<GlobalStackParamList>;

type NavigationProp = CompositeNavigationProp<
  MainNavigationProp,
  GlobalNavigationProp
>;

const SettingScreen = () => {
  const {t} = useTranslation();
  const theme = useAppColor();
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
  const navigate = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (!user) {
      return;
    }
    setUser(null);
    setAuthToken(null);
    dispatch(logout());
    navigate.push('Auth');
  };

  const handleLogin = () => {
    navigate.push('Auth');
  };

  return (
    <View style={[styles.wrapper, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.userInfoCard}>
        {user != null ? (
          <UserInfoComponent
            name={user.name ?? 'N/a'}
            email={user.email ?? 'N/a'}
            image={user.image ?? 'N/a'}
          />
        ) : null}

        <View
          style={[
            cardStyles,
            styles.optionContainer,
            {backgroundColor: theme.cardColor},
          ]}>
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
    padding: 16,
    width: '100%',
    gap: 10,
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
