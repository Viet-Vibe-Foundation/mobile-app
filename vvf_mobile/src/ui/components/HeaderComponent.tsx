import {View, Text, StyleSheet, Image} from 'react-native';
import React, {memo} from 'react';
import {appColor} from '../../constants';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';

interface Prop {
  bottomTabHeaderProp?: BottomTabHeaderProps;
}

const HeaderComponent = ({bottomTabHeaderProp}: Prop) => {
  return (
    <View
      style={[styles.container, {height: bottomTabHeaderProp?.layout.height}]}>
      <Image
        source={require('@assets/images/main-logo.png')}
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
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColor.primaryColor,
  },
});

export default memo(HeaderComponent);
