import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import React from 'react';

interface LanguageItemProp {
  label: string;
  value: string;
  onClick: (val: string) => void;
}

const LanguageItem = ({label, value, onClick}: LanguageItemProp) => {
  return (
    <TouchableOpacity style={styles.option} onPress={() => onClick(value)}>
      <View style={styles.container}>
        <Text style={styles.optionText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'whitesmoke',
  },
  optionText: {
    fontSize: 15,
  },
});

export default LanguageItem;
