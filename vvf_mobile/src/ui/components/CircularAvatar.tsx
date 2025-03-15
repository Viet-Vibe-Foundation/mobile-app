import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {appColor} from '../../constants';

interface Prop {
  imageUrl?: string;
  size?: number;
}

const CircularAvatar: React.FC<Prop> = ({imageUrl, size = 50}) => {
  return (
    <View
      style={[
        styles.container,
        {width: size, height: size, borderRadius: size / 2},
      ]}>
      <Image
        source={
          imageUrl !== 'N/a'
            ? {uri: imageUrl}
            : require('../../../assets/images/default_avatar.jpg')
        }
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appColor.textSecondary,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default CircularAvatar;
