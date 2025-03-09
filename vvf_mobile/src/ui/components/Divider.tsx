import {View, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
  type: 'vertical' | 'horizontal';
}

const Divider: React.FC<Props> = (props: Props) => {
  const {type} = props;

  return (
    <View
      style={[
        styles.divider,
        type === 'vertical' ? styles.vertical : styles.horizontal,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#ccc',
  },
  vertical: {
    width: 1,
    height: '100%',
    marginHorizontal: 10,
  },
  horizontal: {
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
});

export default Divider;
