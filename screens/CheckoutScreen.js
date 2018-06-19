import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";
import { FormLabel, FormInput } from "react-native-elements";
import { StackActions, NavigationActions } from "react-navigation";

import { saveOrder } from "../actions";

const stripe = require("stripe-client")("pk_test_Lknr2ayI1qvRhLbQXY0MHpF7");

// input to fill in which address to deliver
// button to finish the order
// show the current billing info, if not show error message and don't allow them to finish
//
// warn user if they dont have any billing info
//
// find some ways to get user location from MapScreen
// make axios call to distance matrix googleapi to get the eta
// save the current order to redux-persist/redux-store and stop them to make any order in other screens
// add countdown timer to the order
// after the time, show the button to have the user confirm the status of the order. Then we can add the current order to AsyncStorage/redux-store prevOrders and reset the newOrder reducer
// order obj: { menu: , total: , toAddress: , tokenStripe: }

const INFORMATION = {
  card: {
    number: "4242424242424242",
    exp_month: "02",
    exp_year: "21",
    cvc: "999"
  }
};

class CheckoutScreen extends Component {
  static navigationOptions = {
    title: "Checkout"
  };

  state = {
    address: "",
    isLoading: false
  };

  _showCreditCardInfo = () => {
    if (
      Object.keys(this.props.creditCard).length === 0 &&
      this.props.creditCard.constructor === Object
    ) {
      return (
        <View>
          <Text>You haven't provided any credit card info yet.</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("CreditCard", {
                returnScreen: "Checkout"
              })
            }
          >
            <Text>Add one</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Text>{`Your credit card info: ${JSON.stringify(
        this.props.creditCard,
        null,
        4
      )}`}</Text>
    );
  };

  _handleSubmitAddress = async () => {
    this.setState({ isLoading: true });
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Map" })]
    });

    const {
      orderList,
      totalCost,
      // destructuring and rename
      restaurant
    } = this.props.navigation.state.params;
    let card, token;
    try {
      card = await stripe.createToken(INFORMATION);
      token = card.id;
    } catch (e) {
      // REFACTOR: reset the value in 'newOrder' reducer/store
      return Alert.alert("Warning", "Error has occurred. Please order again.", [
        {
          text: "Ok",
          onPress: () => this.props.navigation.dispatch(resetAction)
        }
      ]);
    }

    this.props.saveOrder({
      menu: orderList,
      totalCost: totalCost,
      toAddress: this.state.address,
      stripeToken: token,
      userLocation: this.props.userLocation,
      restaurant
    });

    this.setState({ isLoading: false });

    return Alert.alert(
      "Successful",
      "Your order has been confirmed. Check the order's status on Summary tab",
      [
        {
          text: "Ok",
          onPress: () => this.props.navigation.dispatch(resetAction)
        }
      ]
    );
  };

  _submitAddress = () => {
    return Alert.alert("Confirm", "Are you sure ?", [
      {
        text: "Yes",
        onPress: () => this._handleSubmitAddress()
      },
      {
        text: "No",
        onPress: () => false
      }
    ]);
  };

  render() {
    const { totalCost = 0, orderList } = this.props.navigation.state.params;

    if (!totalCost) {
      return (
        <View contentContainerStyle={styles.contentContainer}>
          <Text>{`You have not order anything`}</Text>
        </View>
      );
    }

    return (
      <View
        style={styles.contentContainer}
        pointerEvents={this.state.isLoading ? "none" : "auto"}
      >
        {this._showCreditCardInfo()}
        <Text>{`You have an order with total cost: ${totalCost}`}</Text>
        <FormLabel>
          Address you want to deliver to: (if empty we will deliver to your
          location)
        </FormLabel>
        <FormInput onChangeText={text => this.setState({ address: text })} />
        {/* REFACTOR: button made from TouchableOpacity should be make as a component, we use this kind of button everywhere and we also ask for confirmation everytime. */}
        <TouchableOpacity onPress={() => this._submitAddress()}>
          <Text>Submit</Text>
        </TouchableOpacity>
        {this.state.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  contentContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    justifyContent: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  loading: {
    flex: 1,
    // position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  }
};

const mapStateToProps = state => {
  return {
    creditCard: state.creditCard,
    userLocation: state.userLocation
  };
};

export default connect(mapStateToProps, { saveOrder })(CheckoutScreen);
