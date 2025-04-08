import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import VectorImage from 'react-native-vector-image';

import React from 'react';

interface LanguageItemProp {
  label: string;
  value: string;
  image: NodeJS.Require;
  onClick: (val: string) => void;
}

const LanguageItem = ({label, value, image, onClick}: LanguageItemProp) => {
  return (
    <TouchableOpacity style={styles.option} onPress={() => onClick(value)}>
      <View style={styles.container}>
        <VectorImage source={image} style={styles.icon} />
        <Text style={styles.optionText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 15,
  },
});

export default LanguageItem;
