import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {MaterialIconName} from '@custom-types/materialType';
import {useAppColor} from 'src/hooks/useAppColor';

interface Props {
  type: 'normal' | 'password';
  placeHolder?: string;
  iconName?: MaterialIconName;
  keyboardType?: KeyboardTypeOptions;
  value?: string | null;
  onChangeText?: (val: string) => void;
  onSubmitEditting?: (
    val: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  style?: ViewStyle | ViewStyle[];
  enable?: boolean;
  errorMessage?: string;
}
const TextInputComponent: React.FC<Props> = ({
  type,
  placeHolder,
  iconName,
  keyboardType = 'default',
  onChangeText,
  style,
  value,
  onSubmitEditting,
  enable = true,
}: Props) => {
  const theme = useAppColor();
  const [focusState, setFocusState] = useState(false);
  const [isHidePassword, setHidePassword] = useState(type === 'password');
  const [internalValue, setInternalValue] = useState<string>('');

  const currentValue =
    value !== undefined && value !== null ? value : internalValue;

  const handleChangeText = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
    if (value === undefined || value === null) {
      setInternalValue(text);
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {backgroundColor: theme.textfield.placeHolder},
        style,
      ]}>
      {type === 'password' ? (
        <TouchableOpacity
          onPress={() => setHidePassword(prev => !prev)}
          style={styles.icon}>
          <MaterialIcons
            name={isHidePassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="#555"
          />
        </TouchableOpacity>
      ) : (
        iconName && (
          <MaterialIcons
            name={iconName}
            size={24}
            color="#555"
            style={styles.icon}
          />
        )
      )}

      <TextInput
        style={styles.textInput}
        placeholder={focusState ? '' : placeHolder}
        value={currentValue}
        editable={enable}
        selectTextOnFocus={enable}
        secureTextEntry={isHidePassword}
        onFocus={() => setFocusState(true)}
        onBlur={() => setFocusState(false)}
        onSubmitEditing={onSubmitEditting}
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
        placeholderTextColor={theme.textfield.placeHolderText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default TextInputComponent;
