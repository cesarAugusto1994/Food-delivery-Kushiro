import React from 'react';
import {
  Picker,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight,
  FlatList,
  Animated,
  TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

// refactor: it should be better if we call Foursquare APIs ourselves and create a different random menu for each restaurant everytime user log to the app
// import markers from './constants/restaurants.json';
import MapScreen from './screens/MapScreen'
import OrderDetailScreen from './screens/OrderDetailScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const RootStack = createBottomTabNavigator({
  Welcome: WelcomeScreen,
  Main: createStackNavigator({
    Map: MapScreen,
    OrderDetail: OrderDetailScreen
  })
},{
  navigationOptions: {
    tabBarVisible: false
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
