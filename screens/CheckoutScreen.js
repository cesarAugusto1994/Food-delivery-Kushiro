import React, { Component } from "react";
import { View, Text, ScrollView, Alert, DatePickerIOS } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";
import { FormLabel, FormInput } from "react-native-elements";

import { saveCreditCard } from "../actions";

const stripe = require("stripe-client")("pk_test_Lknr2ayI1qvRhLbQXY0MHpF7");

// check in store if it already any pending order
// then check if user have saved credit card info and address
// if not give a form to type in card info and place to pick up then confirm the time and place to pick up
// else confirm the time and place to pick up

const information = {
  card: {
    number: "4242424242424242",
    exp_month: "02",
    exp_year: "21",
    cvc: "999"
  }
};

// save the card state into redux store
//

class CheckoutScreen extends Component {
  state = {
    token: {},
    card: {
      number: "",
      exp_month: "",
      exp_year: "",
      cvc: ""
    },
    chosenDate: new Date()
  };

  // async componentDidMount() {
  //   this.onPayment();
  // }
  //
  // async onPayment() {
  //   var card = await stripe.createToken(information);
  //   var token = card.id;
  //   this.setState({ token });
  // }

  setDate = newDate => {
    this.setState({
      card: {
        ...this.state.card,
        exp_month: newDate.getMonth(),
        exp_year: newDate.getFullYear()
      },
      chosenDate: newDate
    });
  };

  render() {
    if (!this.props.totalCost) {
      return (
        <View contentContainerStyle={styles.contentContainer}>
          <Text>{`You have not order anything`}</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <Text style={styles.paragraph}>{JSON.stringify(this.state.token)}</Text> */}
        <FormLabel>Card Number</FormLabel>
        <FormInput
          onChangeText={text =>
            this.setState({ card: { ...this.state.card, number: text } })
          }
        />
        <FormLabel>Expiry Date</FormLabel>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
          mode="date"
        />
        <FormLabel>CVC</FormLabel>
        <FormInput
          secureTextEntry={true}
          onChangeText={text =>
            this.setState({ card: { ...this.state.card, cvc: text } })
          }
        />
        <Text>{JSON.stringify(this.state.card, null, 4)}</Text>
      </ScrollView>
    );
  }
}

const styles = {
  contentContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
};

const mapStateToProps = state => {
  return {
    totalCost: state.totalCost
  };
};

export default connect(mapStateToProps, { saveCreditCard })(CheckoutScreen);
