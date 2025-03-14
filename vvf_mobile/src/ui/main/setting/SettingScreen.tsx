import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {useMMKVObject} from 'react-native-mmkv';
import {storagePropertiesName} from '../../../constants';
import {User} from 'src/data/user';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

const SettingScreen = () => {
  const [user] = useMMKVObject<User>(storagePropertiesName.userInfo);
  const {t} = useTranslation();
  const [language, setLanguage] = useState(i18next.language);

  const changeLanguage = async (lang: string) => {
    await i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings')}</Text>
      <Text style={styles.info}>
        {t('current_language')}: {language}
      </Text>

      <Button title="Tiếng Việt" onPress={() => changeLanguage('vi')} />
      <Button title="English" onPress={() => changeLanguage('en')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default SettingScreen;
