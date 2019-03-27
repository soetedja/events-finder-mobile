import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import TabBarIcon from '../components/TabBarIcon';
import WelcomeScreen from '../screens/WelcomeScreen';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import SettingScreen from '../screens/SettingScreen';
import MapScreen from '../screens/MapScreen';
import EventFormScreen from '../screens/EventFormScreen';
import IconWithBadge from '../components/IconWithBadge';
import EventDetailScreen from '../screens/EventDetailScreen';

const HomeStack = createStackNavigator(
  {
    Splash: SplashScreen,
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

const HomeIconWithBadge = props => (
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  <IconWithBadge {...props} badgeCount={3} />
);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName = 'home';
  if (routeName === 'Map') {
    iconName = `map${focused ? '-o' : '-o'}`;
    // We want to add badges to home tab icon
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Setting') {
    iconName = `ios-settings${focused ? '' : ''}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const MapStack = createStackNavigator({
  Map: {
    screen: MapScreen,
    navigationOptions: {
      header: null
    }
  },
  EventForm: {
    screen: EventFormScreen,
    navigationOptions: {
      title: 'Post a new Event'
    }
  },
  EventDetail: {
    screen: EventDetailScreen,
    navigationOptions: {
      title: 'Event Details'
    }
  }
});

const MainStack = createBottomTabNavigator(
  {
    Map: MapStack,
    Setting: SettingScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
);

MapScreen.navigationOptions = {
  tabBarLabel: 'Map'
  // tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-map'} />
};

SettingScreen.navigationOptions = {
  tabBarLabel: 'Setting'
  // tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-key'} />
};

EventFormScreen.navigationOptions = {
  tabBarLabel: 'Event',
  tabBarIcon: ({ focused }) => <Icon name='ios-calendar' size={25} />
};

export default createSwitchNavigator({
  HomeStack,
  AuthStack,
  MainStack
});
