import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// refactor: we should call Foursquare APIs ourselves and create a different random menu for each restaurant everytime user log to the app
import MapScreen from "./screens/MapScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import AccountScreen from "./screens/AccountScreen";
import reducers from "./reducers";

const RootStack = createBottomTabNavigator(
  {
    Welcome: WelcomeScreen,
    Main: createBottomTabNavigator(
      {
        Account: AccountScreen,
        Order: createStackNavigator({
          Map: MapScreen,
          OrderDetail: OrderDetailScreen,
          Checkout: CheckoutScreen
        })
      },
      {
        navigationOptions: {
          tabBarVisible: true
        }
      }
    )
  },
  {
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

const store = createStore(reducers, {}, applyMiddleware());

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <RootStack />
        </View>
      </Provider>
    );
  }
}
