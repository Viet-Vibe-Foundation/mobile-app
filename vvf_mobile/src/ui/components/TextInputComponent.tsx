import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {appColor} from '../../constants';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {MaterialIconName} from '@types/materialType';

interface Props {
  type: 'normal' | 'password';
  placeHolder: string;
  iconName?: MaterialIconName;
}

const TextInputComponent: React.FC<Props> = (props: Props) => {
  const {type, placeHolder, iconName} = props;

  const [focusState, setFocusState] = useState<boolean>(false);
  const [isHidePassword, setHidePassword] = useState<boolean>(
    type === 'password',
  );

  return (
    <View
      style={[
        styles.inputContainer,
        {borderColor: focusState ? appColor.primaryColor : 'black'},
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
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
});

export default TextInputComponent;
