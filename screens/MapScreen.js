import React from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Location, Permissions } from "expo";
import { connect } from "react-redux";

import { saveUserLocation } from "../actions";
import markers from "../constants/restaurants.json";

const PANEL_HEIGHT = 250;

const REGION = {
  latitude: 42.975,
  longitude: 144.37472,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

class MapScreen extends React.Component {
  static navigationOptions = {
    title: "Map"
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  constructor(props) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(PANEL_HEIGHT),
      isPanelHidden: true,
      restaurant: "",
      // make constants REGION
      region: REGION,
      locationResult: null,
      location: null,
      hasLocationPermissions: false
    };
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    this.props.saveUserLocation(location);

    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
      }
    });
  };

  _onRegionChangeComplete = region => {
    this.setState({ region });
  };

  _toggleSubview(toValue, isPanelHidden, marker) {
    Animated.spring(this.state.bounceValue, {
      toValue,
      speed: 8,
      bounciness: 8
    }).start();

    this.setState({
      isPanelHidden,
      restaurant: marker ? marker : ""
    });
  }

  _keyExtractor = (item, index) => item.name;
  _showRestaurantInfo(restaurant) {
    if (restaurant) {
      const {
        name,
        contact: {
          formattedPhone = "This restaurant does not have a phone number yet."
        },
        location: { formattedAddress },
        menu
      } = restaurant;

      return (
        <Animated.View
          style={[
            styles.subView,
            {
              transform: [{ translateY: this.state.bounceValue }]
            }
          ]}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold" }}
          >{`Name: ${name}`}</Text>
          <Text style={{ fontSize: 15 }}>{`Address: ${formattedAddress.join(
            " "
          )}`}</Text>
          <Text
            style={{ fontSize: 15 }}
          >{`Phone number: ${formattedPhone}`}</Text>
          <Text />
          <FlatList
            data={menu}
            renderItem={({ item }) => (
              <Text style={{ fontSize: 15 }}>{`${item.name}: ${
                item.price
              }￥`}</Text>
            )}
            keyExtractor={this._keyExtractor}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (this.props.newOrder.stripeToken) {
                return Alert.alert(
                  "Not available",
                  "You already have an order on the way. Please wait after it is finished."
                );
              }
              this.props.navigation.navigate("OrderDetail", restaurant);
            }}
          >
            <Text>Start Ordering</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    }
  }

  _renderPositionMarker() {
    if (this.state.location) {
      const { latitude, longitude } = this.state.location.coords;

      return (
        <Marker coordinate={{ latitude, longitude }} title="Your location" />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={this._onRegionChangeComplete}
        >
          {markers.map(marker => (
            <Marker
              coordinate={{
                latitude: marker.location.lat,
                longitude: marker.location.lng
              }}
              title={marker.name}
              description={marker.location.formattedAddress.join(" ")}
              key={marker.name}
              // image={require('../assets/restaurant.png')}
              onSelect={e => this._toggleSubview(0.01, false, marker)}
              onDeselect={e => this._toggleSubview(PANEL_HEIGHT, true)}
            />
          ))}
          {this._renderPositionMarker()}
        </MapView>
        {this._showRestaurantInfo(this.state.restaurant)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    newOrder: state.newOrder
  };
};

export default connect(mapStateToProps, { saveUserLocation })(MapScreen);
