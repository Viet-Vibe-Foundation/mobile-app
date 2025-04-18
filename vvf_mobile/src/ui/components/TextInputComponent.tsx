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
import {appColor} from '../../constants';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {MaterialIconName} from '@types/materialType';

interface Props {
  type: 'normal' | 'password';
  placeHolder: string;
  iconName?: MaterialIconName;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (val: string) => void;
  onSubmitEditting?: (
    val: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  style?: ViewStyle | ViewStyle[];
}

const TextInputComponent: React.FC<Props> = ({
  type,
  placeHolder,
  iconName,
  keyboardType = 'default',
  onChangeText,
  style,
  onSubmitEditting,
}: Props) => {
  const [focusState, setFocusState] = useState<boolean>(false);
  const [isHidePassword, setHidePassword] = useState<boolean>(
    type === 'password',
  );

  return (
    <View
      style={[
        styles.inputContainer,
        {borderColor: focusState ? appColor.primaryColor : 'black'},
        style,
      ]}>
      {type === 'password' ? (
        <TouchableOpacity onPress={() => setHidePassword(prev => !prev)}>
          {isHidePassword ? (
            <MaterialIcons name="visibility" size={30} />
          ) : (
            <MaterialIcons name="visibility-off" size={30} />
          )}
        </TouchableOpacity>
      ) : (
        iconName && <MaterialIcons name={iconName} size={30} />
      )}
      <TextInput
        style={styles.textInput}
        placeholder={placeHolder}
        secureTextEntry={isHidePassword}
        onFocus={() => setFocusState(true)}
        onBlur={() => setFocusState(false)}
        onSubmitEditing={onSubmitEditting}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
});

export default TextInputComponent;
