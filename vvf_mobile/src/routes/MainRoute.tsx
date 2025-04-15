import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from 'src/ui/main';
import PostScreen from 'src/ui/main/post/PostScreen';
import HeaderComponent from 'src/ui/components/HeaderComponent';
import {appColor} from 'src/constants';
import EventDetailScreen from 'src/ui/main/event/EventDetailScreen';
import UserProfile from 'src/ui/main/setting/profile/UserProfile';

const Stack = createNativeStackNavigator();

const MainRoute: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        statusBarTranslucent: true,
        headerTitleAlign: 'center',
        headerTintColor: appColor.primaryColor,
        header: () => <HeaderComponent isMainRouter={true} />,
      }}>
      <Stack.Screen
        name="Index"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

export default MainRoute;
