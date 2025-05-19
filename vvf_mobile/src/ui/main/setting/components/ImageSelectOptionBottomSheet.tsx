import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {cardStyles} from '@constants';

interface Prop {
  optionList: string[];
  onOptionSelected: (selected: string) => void;
}

const ImageSelectOptionBottomSheet = ({optionList, onOptionSelected}: Prop) => {
  return (
    <View style={styles.container}>
      {optionList.map((item, index) => (
        <TouchableOpacity
          style={styles.item}
          key={index}
          onPress={() => onOptionSelected(item)}>
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...cardStyles,
  },
  item: {
    width: '100%',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
});

export default ImageSelectOptionBottomSheet;
