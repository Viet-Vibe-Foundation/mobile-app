import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {MaterialIconName} from '@custom-types/materialType';

interface Props {
  icon: MaterialIconName;
  text: string;
  iconColor?: string;
  textColor?: string;
  textSize?: number;
  iconSize?: number;
}

const IconTextComponent: React.FC<Props> = ({
  icon,
  text,
  iconColor = 'black',
  textColor = 'black',
  textSize = 15,
  iconSize = 20,
}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={iconSize} color={iconColor} />
      <Text
        style={[styles.text, {color: textColor, fontSize: textSize}]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
});

export default IconTextComponent;
