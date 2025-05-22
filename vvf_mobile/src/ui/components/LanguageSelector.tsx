import {languageList} from '@constants';
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutRectangle,
} from 'react-native';
import LanguageItem from './LanguageItem';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage} from 'src/libs/redux/languageSlice';
import i18next from 'i18next';
import {RootState} from 'src/libs/redux/store';

const LanguageSelector = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState<LayoutRectangle | null>(
    null,
  );
  const language = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch();
  const handleSelect = async (item: string) => {
    dispatch(changeLanguage(item));
    setDropdownVisible(false);
    await i18next.changeLanguage(item);
  };

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
        onLayout={event => setButtonLayout(event.nativeEvent.layout)}>
        <Text style={styles.buttonText}>
          {languageList.find(item => item.value === language.value)?.label}
        </Text>
      </TouchableOpacity>

      {isDropdownVisible && buttonLayout && (
        <View
          style={[
            styles.dropdown,
            {
              top: buttonLayout.y + buttonLayout.height,
              left: buttonLayout.x,
              width: buttonLayout.width,
            },
          ]}>
          {languageList.map(item => (
            <LanguageItem
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
    // Đảm bảo container có position: 'relative' để dropdown định vị đúng
    position: 'relative',
  },
  button: {
    padding: 15,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: 'gray',
  },
  buttonText: {
    fontWeight: '600',
    minWidth: 70,
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 0.2,
    borderColor: 'grey',
    shadowOffset: {width: 0, height: 2},
    position: 'absolute',
    zIndex: 1000,
  },

  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default LanguageSelector;
