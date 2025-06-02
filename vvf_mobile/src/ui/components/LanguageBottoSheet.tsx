import React from 'react';
import BottomSheet from './BottomSheet';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import FilledButtonComponent from './FilledButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLanguageModal} from 'src/libs/redux/languageModalSlice';
import {RootState} from 'src/libs/redux/store';
import {appColor, languageList} from '@constants';
import {changeLanguage} from 'src/libs/redux/languageSlice';
import i18next, {t} from 'i18next';

const LanguageBottoSheet = () => {
  const languageModalState = useSelector(
    (state: RootState) => state.languageModal,
  );
  const appLanguageState = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch();
  const handleChangeLanguage = (languageValue: string) => {
    dispatch(changeLanguage(languageValue));
    i18next.changeLanguage(languageValue);
    dispatch(toggleLanguageModal());
  };

  return (
    <BottomSheet
      isOpen={languageModalState.isOpen}
      toggleSheet={() => dispatch(toggleLanguageModal())}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('current_language')}</Text>
        <MaterialIcons name="language" size={50} style={styles.icon} />
        {languageList.map(item => {
          const buttonStyle: ViewStyle = {
            backgroundColor:
              appLanguageState.value === item.value
                ? appColor.primaryColor
                : 'whitemoke',
            borderColor:
              appLanguageState.value === item.value
                ? 'black'
                : appColor.disabledColor,
            borderWidth: appLanguageState.value === item.value ? 1 : 0.5,
          };
          const lableStyle: TextStyle = {
            fontSize: 18,
            fontWeight: 'semibold',
            color: appLanguageState.value === item.value ? 'white' : 'black',
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

export default LanguageBottoSheet;
