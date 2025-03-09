import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {appColor} from '../../constants';
import {StyleSheet, Text, View} from 'react-native';
import EventScreen from './event/EventScreen';
import PostScreen from './post/PostScreen';
import SearchScreen from './search/SearchScreen';
import SettingScreen from './setting/SettingScreen';
import HeaderComponent from '../components/HeaderComponent';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 'auto',
            position: 'absolute',
            borderRadius: 15,
            backgroundColor: appColor.toolBarColor,
            elevation: 5,
          },
        }}>
        <Tab.Screen
          name="Events"
          component={EventScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialIcons
                name={'event'}
                style={{color: focused ? appColor.primaryColor : 'black'}}
                size={20}
              />
            ),
            tabBarLabel: ({focused}) =>
              focused && (
                <Text style={{color: appColor.primaryColor}}>Events</Text>
              ),
          }}
        />
        <Tab.Screen
          name="Posts"
          component={PostScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialIcons
                name={'feed'}
                style={{color: focused ? appColor.primaryColor : 'black'}}
                size={20}
              />
            ),
            tabBarLabel: ({focused}) =>
              focused && (
                <Text style={{color: appColor.primaryColor}}>Posts</Text>
              ),
          }}
        />
        <Tab.Screen
          name="Seacrh"
          component={SearchScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialIcons
                name={'search'}
                style={{color: focused ? appColor.primaryColor : 'black'}}
                size={20}
              />
            ),
            tabBarLabel: ({focused}) =>
              focused && (
                <Text style={{color: appColor.primaryColor}}>Seacrh</Text>
              ),
          }}
        />
        <Tab.Screen
          name="More"
          component={SettingScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialIcons
                name={'list'}
                style={{color: focused ? appColor.primaryColor : 'black'}}
                size={20}
              />
            ),
            tabBarLabel: ({focused}) =>
              focused && (
                <Text style={{color: appColor.primaryColor}}>More</Text>
              ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
