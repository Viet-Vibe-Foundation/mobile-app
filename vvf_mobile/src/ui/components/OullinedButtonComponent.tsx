import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {appColor} from '../../constants';

interface Props {
  onPress: () => void;
  title: string;
  color?: string;
}

const OutlinedButtonComponent = (props: Props) => {
  const {onPress, title, color} = props;

  return (
    <TouchableOpacity
      style={
        color ? {...styles.container, backgroundColor: color} : styles.container
      }
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    padding: 10,
    borderWidth: 2,
    borderColor: appColor.primaryColor,
  },
  title: {
    textAlign: 'center',
    color: appColor.primaryColor,
  },
});

export default OutlinedButtonComponent;
