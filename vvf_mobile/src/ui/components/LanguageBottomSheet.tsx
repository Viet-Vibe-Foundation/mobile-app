import React from 'react';
import BottomSheet from './BottomSheet';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import FilledButtonComponent from './FilledButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLanguageModal} from '@libs/redux/languageModalSlice';
import {RootState} from '@libs/redux/store';
import {languageList} from '@constants';
import {changeLanguage} from '@libs/redux/languageSlice';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {useAppColor} from 'src/hooks/useAppColor';

const LanguageBottomSheet = () => {
  const {t} = useTranslation();
  const languageModalState = useSelector(
    (state: RootState) => state.languageModal,
  );
  const appLanguageState = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch();
  const theme = useAppColor();
  const handleChangeLanguage = async (languageValue: string) => {
    dispatch(toggleLanguageModal());
    dispatch(changeLanguage(languageValue));
    await i18next.changeLanguage(languageValue);
  };

  return (
    <BottomSheet
      isOpen={languageModalState.isOpen}
      toggleSheet={() => dispatch(toggleLanguageModal())}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: theme.onPrimary}]}>
          {t('current_language')}
        </Text>
        <MaterialIcons
          name="language"
          size={50}
          style={[styles.icon, {color: theme.onPrimary}]}
        />
        {languageList.map(item => {
          const buttonStyle: ViewStyle = {
            backgroundColor:
              appLanguageState.value === item.value
                ? theme.buttonPrimary
                : theme.buttonDisabled,
            borderColor:
              appLanguageState.value === item.value
                ? theme.buttonPrimary
                : theme.buttonDisabled,
            borderWidth: appLanguageState.value === item.value ? 1 : 0.5,
          };
          const lableStyle: TextStyle = {
            fontSize: 18,
            fontWeight: 'semibold',
            color:
              appLanguageState.value === item.value ? 'white' : theme.onPrimary,
          };
          return (
            <FilledButtonComponent
              key={`language_${item.value}`}
              title={item.label}
              onPress={() => handleChangeLanguage(item.value)}
              style={buttonStyle}
              textStyle={lableStyle}
            />
          );
        })}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    margin: 10,
  },
  icon: {alignSelf: 'center', marginBottom: 10},
});

export default LanguageBottomSheet;
