import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ViewStyle,
  KeyboardTypeOptions,
  Animated,
  TextStyle,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {appColor} from '../../constants';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {MaterialIconName} from '@custom-types/materialType';

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
  label?: string;
  isError?: boolean;
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
  label,
  isError,
}: Props) => {
  const [focusState, setFocusState] = useState(false);
  const [isHidePassword, setHidePassword] = useState(type === 'password');
  const [internalValue, setInternalValue] = useState<string>('');
  const animatedIsFocused = useRef(
    new Animated.Value(value !== undefined && value !== null ? 1 : 0),
  ).current;

  const currentValue =
    value !== undefined && value !== null ? value : internalValue;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: focusState || currentValue !== '' ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [focusState, currentValue]);

  const handleChangeText = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
    if (value === undefined || value === null) {
      setInternalValue(text);
    }
  };

  const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: 'absolute',
    left: 10,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [12, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: isError ? 'red' : focusState ? appColor.primaryColor : '#aaa',
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: isError
            ? 'red'
            : focusState
            ? appColor.primaryColor
            : '#aaa',
        },
        style,
      ]}>
      {label && <Animated.Text style={labelStyle}>{label}</Animated.Text>}

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
        placeholderTextColor={'grey'}
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
    backgroundColor: '#fff',
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
