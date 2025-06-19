import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {appColor} from '@styles/appColor';

interface Props {
  title: string;
  subTitle: string;
}

const AuthHeaderComponent = (prop: Props) => {
  const {title, subTitle} = prop;

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.popTo('Main')}
        style={styles.existBtn}>
        <MaterialIcon name="close" />
      </TouchableOpacity>
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
    paddingTop: 10,
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
  existBtn: {
    position: 'absolute',
    top: 25,
    right: 0,
    backgroundColor: 'grey',
    borderRadius: 40,
    padding: 10,
  },
});

export default AuthHeaderComponent;
