import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
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
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: appColor.toolBarColor,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColor.primaryColor,
  },
});

export default HeaderComponent;
