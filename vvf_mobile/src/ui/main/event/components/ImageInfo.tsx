import {View, Image, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';

interface Props {
  imageUrl: string;
  style?: ViewStyle | ViewStyle[];
}

const ImageInfo = (prop: Props) => {
  const {imageUrl, style} = prop;

  return (
    <View style={[styles.container, style]}>
      <Image source={{uri: imageUrl}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default ImageInfo;
