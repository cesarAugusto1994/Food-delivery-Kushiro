import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { FormInput, PricingCard } from "react-native-elements";
import { StackActions, NavigationActions } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SubmitButton from "../components/SubmitButton";
import { saveOrder } from "../actions";
import { STRIPE_PUBLIC_KEY, CREDIT_CARD_INFO } from "../config";

const stripe = require("stripe-client")(STRIPE_PUBLIC_KEY);

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
    const { number, cvc, name, exp_month, exp_year } = this.props.creditCard;
    return (
      <View>
        <PricingCard
          color="#F44336"
          title={name}
          info={[number, `${exp_month}/${exp_year}`, cvc]}
          button={{ title: "Change Credit Card Info" }}
          onButtonPress={() =>
            this.props.navigation.navigate("CreditCard", {
              returnToScreen: "Checkout"
            })
          }
        />
      </View>
    );
  };

  _handleSubmitAddress = async () => {
    this.setState({ isLoading: !this.state.isLoading });
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Map" })]
    });

    const {
      orderList,
      totalCost,
      restaurant
    } = this.props.navigation.state.params;
    let card, token;
    try {
      card = await stripe.createToken(CREDIT_CARD_INFO);
      token = card.id;
    } catch (e) {
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

    this.setState({ isLoading: !this.state.isLoading });

    // FIXED BUG: can't call Alert right after set the state of 'isLoading', setTimeout is a temporary workaround => react-native issues
    setTimeout(() => {
      Alert.alert("Successful", "Your order has been confirmed.", [
        {
          text: "Ok",
          onPress: () => {
            this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate("Summary");
          }
        }
      ]);
    }, 100);

    return true;
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
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        {this._showCreditCardInfo()}
        <Text style={styles.paragraph}>{`Total cost: ${totalCost}￥`}</Text>
        <Text style={styles.paragraph}>
          Address you want to deliver to: (if empty we will deliver to your
          location)
        </Text>
        <FormInput onChangeText={text => this.setState({ address: text })} />
        <SubmitButton onPress={this._handleSubmitAddress} />
        <Modal transparent={true} visible={this.state.isLoading}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#4f9deb" />
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  contentContainer: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center"
  },
  paragraph: {
    margin: 10,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  loading: {
    position: "absolute",
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
