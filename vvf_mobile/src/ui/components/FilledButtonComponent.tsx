import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/material-icons';
import type {MaterialIconName} from '@custom-types/materialType';
import {appColor} from '@styles/appColor';

interface Props {
  onPress: () => void;
  title?: string;
  iconName?: MaterialIconName;
  backgroundColor?: string;
  iconColor?: string;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  enabled?: boolean;
  textStyle?: TextStyle | TextStyle[];
}

const FilledButtonComponent = (props: Props) => {
  const {
    onPress,
    title,
    iconName,
    backgroundColor,
    textStyle,
    style,
    iconColor,
    loading,
    enabled = true,
  } = props;

  const opacityValue = enabled ? 1 : 0.6;
  const textColorWithoutIcon = !enabled ? appColor.disabledTextColor : 'white';
  const textColorWithIcon = !enabled
    ? appColor.disabledTextColor
    : iconColor ?? 'black';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        backgroundColor &&
          enabled && {
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
          },
        !enabled && styles.disabledStyle,
        {opacity: opacityValue},
        style,
      ]}
      disabled={!enabled}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color={'#FFF'} />
      ) : (
        <>
          {title && (
            <Text
              style={[
                styles.title,
                {
                  color: textColorWithoutIcon,
                },
                textStyle,
              ]}>
              {title}
            </Text>
          )}
          {iconName && (
            <Icon name={iconName} size={30} color={textColorWithIcon} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: appColor.primaryColor,
    padding: 10,
    borderWidth: 1,
    borderColor: appColor.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
  disabledStyle: {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc',
  },
});

export default FilledButtonComponent;
