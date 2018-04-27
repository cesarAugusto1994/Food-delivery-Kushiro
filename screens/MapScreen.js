import React from 'react';
import {
  Picker,
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import markers from '../constants/restaurants.json';


const PANEL_HEIGHT = 250;

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
  }

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
        toValue,
        speed: 8,
        bounciness: 8
      }
    ).start();

    this.setState({
      isPanelHidden,
      restaurant: marker ? marker : ''
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
          <TouchableOpacity
             style={styles.button}
             onPress={() => this.props.navigation.navigate('OrderDetail', restaurant)}
           >
             <Text>Start Ordering</Text>
           </TouchableOpacity>
        </Animated.View>
      )
    }
    else {

    }
  }

  render() {
    return (
      <View style={styles.container}>
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
              // image={require('../assets/restaurant.png')}
              onSelect={e => this._toggleSubview(0, false, marker)}
              onDeselect={e => this._toggleSubview(PANEL_HEIGHT, true)}
            />
          ))}
        </MapView>
        {this._showRestaurantInfo(this.state.restaurant)}
      </View>
    );
  }
}

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
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});
