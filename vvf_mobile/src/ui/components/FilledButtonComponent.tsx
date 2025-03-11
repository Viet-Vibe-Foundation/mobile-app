import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {appColor} from '../../constants';
import Icon from '@react-native-vector-icons/material-icons';
import type {MaterialIconName} from '@types/materialType';

interface Props {
  onPress: () => void;
  title?: string;
  iconName?: MaterialIconName;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
}

const FilledButtonComponent = (props: Props) => {
  const {
    onPress,
    title,
    iconName,
    backgroundColor,
    textColor,
    style,
    iconColor,
    loading,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        backgroundColor && {
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
        },
        style,
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color={'#FFF'} />
      ) : (
        <>
          {title && (
            <Text style={[styles.title, {color: textColor ?? 'white'}]}>
              {title}
            </Text>
          )}
          {iconName && (
            <Icon name={iconName} size={30} color={iconColor ?? 'black'} />
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
});

export default FilledButtonComponent;
