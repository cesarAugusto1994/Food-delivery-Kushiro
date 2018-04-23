import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight,
  FlatList,
  Animated
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';

import markers from './constants/restaurants.json';

const PANEL_HEIGHT = 250;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(PANEL_HEIGHT),
      isPanelHidden: true,
      restaurant: ''
    }
  }

  _toggleSubview(toValue, isPanelHidden, marker) {
    Animated.spring(
      this.state.bounceValue,
      {
        toValue
      }
    ).start();

    this.setState({
      isPanelHidden,
      restaurant: marker ? marker : ''
    });
  }

  _showMenu(menu) {
    return menu.forEach(item => {
      return (
        <Text>
          {item.name}
        </Text>
      );
    });
  }

  _keyExtractor = (item, index) => item.name;
  _showRestaurantInfo(restaurant) {
    if (restaurant) {
      const { name, contact: { formattedPhone }, location: { formattedAddress }, menu } = restaurant;

      return (
        <Animated.View
          style={[
            styles.subView,
            {
              transform: [{ translateY: this.state.bounceValue }]
            }
          ]}
        >
          <Text>{name}</Text>
          <Text>{formattedAddress.join(' ')}</Text>
          <Text>{formattedPhone}</Text>
          <FlatList
            data={menu}
            renderItem={({item}) => <Text>{`${item.name}: ${item.price}￥`}</Text>}
            keyExtractor={this._keyExtractor}
          />
        </Animated.View>
      )
    }
    else {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 42.975,
            longitude: 144.37472,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers.map(marker => (
            <Marker
              coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
              title={marker.name}
              description={marker.location.formattedAddress.join(' ')}
              key={marker.name}
              onSelect={e => this._toggleSubview(0, false, marker)}
              onDeselect={e => {this._toggleSubview(PANEL_HEIGHT, true)}}
            />
          ))}
        </MapView>
        {this._showRestaurantInfo(this.state.restaurant)}
        {/* <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        /> */}
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: PANEL_HEIGHT
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
