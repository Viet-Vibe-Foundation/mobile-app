import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {StyleSheet, Text} from 'react-native';
import SearchScreen from './search/SearchScreen';
import SettingScreen from './setting/SettingScreen';
import HomeScreen from './home/HomeScreen';
import HeaderComponent from '@components/HeaderComponent';
import {MaterialIconName} from '@custom-types/materialType';
import {LabelPosition} from 'node_modules/@react-navigation/bottom-tabs/lib/typescript/src/types';
import {appColor} from '@styles/appColor';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();
const renderHeader = () => <HeaderComponent />;

const renderTabBarIcon = (focused: boolean, name: MaterialIconName) => (
  <MaterialIcons
    name={name}
    style={[focused ? styles.iconFocused : styles.iconUnfocused, styles.icon]}
    size={24}
  />
);

const CustomTabarLabel = (props: {
  focused: boolean;
  color: string;
  position: LabelPosition;
  children: string;
}) => {
  const {t} = useTranslation();
  return (
    props.focused && <Text style={styles.tabbarLabel}>{t(props.children)}</Text>
  );
};

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: 15,
          backgroundColor: appColor.toolBarColor,
        },
        tabBarLabel: props => CustomTabarLabel(props),
        header: renderHeader,
        tabBarItemStyle: styles.tabbarItem,
        animation: 'fade',
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({focused}) => renderTabBarIcon(focused, 'home'),
        }}
      />

      <Tab.Screen
        name={'Search'}
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => renderTabBarIcon(focused, 'search'),
        }}
      />
      <Tab.Screen
        name={'More'}
        component={SettingScreen}
        options={{
          header: renderHeader,
          tabBarIcon: ({focused}) => renderTabBarIcon(focused, 'list'),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconFocused: {
    color: appColor.primaryColor,
  },
  iconUnfocused: {
    color: 'black',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  tabbarItem: {
    alignItems: 'center',
  },
  tabbarLabel: {color: appColor.primaryColor, marginTop: -5},
});

export default MainScreen;
