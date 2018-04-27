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
import { StackNavigator } from 'react-navigation';

// refactor: it should be better if we call Foursquare APIs ourselves and create a different random menu for each restaurant everytime user log to the app
// import markers from './constants/restaurants.json';
import MapScreen from './screens/MapScreen'
import OrderDetailScreen from './screens/OrderDetailScreen';

const RootStack = StackNavigator(
  {
    Map: {
      screen: MapScreen,
    },
    OrderDetail: {
      screen: OrderDetailScreen,
    },
  },
  {
    initialRouteName: 'Map',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
