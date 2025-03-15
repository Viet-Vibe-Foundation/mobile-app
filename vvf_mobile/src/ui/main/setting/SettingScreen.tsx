import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {storagePropertiesName} from '../../../constants';
import {User} from 'src/data/user';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import UserInfoComponent from './components/UserInfoComponent';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from 'src/libs/mmvkStorage';
import FilledButtonComponent from 'src/ui/components/FilledButtonComponent';
import {useNavigation} from '@react-navigation/native';

const SettingScreen = () => {
  const {t} = useTranslation();
  const [language, setLanguage] = useState(i18next.language);
  const [user, setUser] = useMMKVStorage<User>(
    storagePropertiesName.userInfo,
    mmkvStorage,
    {},
  );
  const [authToken, setAuthToken] = useMMKVStorage<string>(
    storagePropertiesName.authToken,
    mmkvStorage,
    '',
  );
  const navigate = useNavigation<any>();
  const changeLanguage = async (lang: string) => {
    await i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  const handleLogout = () => {
    if (!authToken) return;
    if (!user) return;
    setUser({});
    setAuthToken('');
    navigate.replace('Auth');
  };

  return (
    <View style={styles.container}>
      <UserInfoComponent
        name={user.name ?? 'N/a'}
        email={user.email ?? 'N/a'}
        image={user.image ?? 'N/a'}
      />

      <Text style={styles.info}>
        {t('current_language')}: {language}
      </Text>

      <FilledButtonComponent
        style={styles.button}
        title="Tiếng Việt"
        onPress={() => changeLanguage('vi')}
      />
      <FilledButtonComponent
        style={styles.button}
        title="English"
        onPress={() => changeLanguage('en')}
      />
      <FilledButtonComponent
        style={styles.button}
        title="Logout"
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
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
  button: {
    margin: 10,
    width: 100,
    height: 50,
  },
});

export default SettingScreen;
