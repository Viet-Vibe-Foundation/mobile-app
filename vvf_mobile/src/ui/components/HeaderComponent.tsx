import React, {memo} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from '@react-native-vector-icons/material-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {appColor} from '@styles/appColor';

interface Prop {
  isMainRouter?: boolean;
}

const HeaderComponent: React.FC<Prop> = ({isMainRouter = false}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {isMainRouter && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <MaterialIcon
            name="arrow-back"
            size={24}
            color={appColor.primaryColor}
          />
        </TouchableOpacity>
      )}

      <View style={styles.centerContainer}>
        <Image
          source={require('@assets/images/main-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Viet Vibe Foundation</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
  },

  backButton: {
    marginRight: 10,
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 8,
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColor.primaryColor,
  },
});

export default memo(HeaderComponent);
