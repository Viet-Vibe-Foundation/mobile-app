import {View, Text, StyleSheet, Image} from 'react-native';
import React, {memo} from 'react';
import {appColor} from '../../constants';

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/main-logo.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title}>Viet Vibe Foundation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColor.primaryColor,
  },
});

export default memo(HeaderComponent);
