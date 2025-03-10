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
  color?: string;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
}

const FilledButtonComponent = (props: Props) => {
  const {onPress, title, iconName, color, style, loading} = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        color && {backgroundColor: color, borderColor: color},
        style,
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color={'#FFF'} />
      ) : (
        <>
          {title && <Text style={styles.title}>{title}</Text>}
          {iconName && <Icon name={iconName} size={30} />}
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
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
});

export default FilledButtonComponent;
