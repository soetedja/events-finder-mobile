import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import SettingScreen from '../screens/SettingScreen';
import MapScreen from '../screens/MapScreen';

const HomeStack = createStackNavigator(
  {
    Home: WelcomeScreen
  },
  {
    headerMode: 'none'
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-home'} />
};

const AuthStack = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    headerMode: 'none'
  }
);

AuthStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-key'} />
};

const MainStack = createBottomTabNavigator({
  Map: MapScreen,
  Setting: SettingScreen
});

MapScreen.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-map'} />
};

SettingScreen.navigationOptions = {
  tabBarLabel: 'Setting',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-key'} />
};

export default createSwitchNavigator({
  AuthStack,
  MainStack,
  HomeStack
});
