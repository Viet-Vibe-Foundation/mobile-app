import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {appColor} from 'src/constants';

interface Props {
  title: string;
  subTitle: string;
}

const AuthHeaderComponent = (prop: Props) => {
  const {title, subTitle} = prop;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>{subTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    fontSize: 30,
    color: appColor.primaryColor,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 20,
    color: appColor.textSecondary,
  },
});

export default AuthHeaderComponent;
