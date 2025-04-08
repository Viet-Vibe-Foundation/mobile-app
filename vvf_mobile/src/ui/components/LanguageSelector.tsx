import i18next from 'i18next';
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  Text,
} from 'react-native';
import {languageList} from 'src/constants';
import LanguageItem from './LanguageItem';
import VectorImage from 'react-native-vector-image';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/libs/redux/store';
import {changeLanguage} from 'src/libs/redux/languageSlice';

interface LanguageSelectorProp {
  style?: ViewStyle | ViewStyle[];
}

const LanguageSelector = ({style}: LanguageSelectorProp) => {
  const language = useSelector((state: RootState) => state.language.value);
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  const handleSelect = async (item: string) => {
    dispatch(changeLanguage(item));
    setDropdownVisible(false);
    await i18next.changeLanguage(item);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <VectorImage
          source={languageList.find(item => item.value === language)?.image}
          style={styles.icon}
        />
        <Text>
          {isDropdownVisible &&
            languageList.find(item => item.value === language)?.label}
        </Text>
      </TouchableOpacity>
      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          {languageList.map((item, index) => (
            <LanguageItem
              key={`${index}_${item.value}`}
              image={item.image}
              label={item.label}
              onClick={handleSelect}
              value={item.value}
            />
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  button: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  dropdownContainer: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 15,
  },
});

export default LanguageSelector;
