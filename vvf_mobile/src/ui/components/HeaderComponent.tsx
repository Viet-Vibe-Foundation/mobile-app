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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColor.primaryColor,
  },
});

export default HeaderComponent;
