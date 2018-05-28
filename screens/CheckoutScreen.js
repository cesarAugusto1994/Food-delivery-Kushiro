import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import { Constants } from "expo";
import axios from "axios";
const stripe = require("stripe-client")("pk_test_Lknr2ayI1qvRhLbQXY0MHpF7");

const information = {
  card: {
    number: "4242424242424242",
    exp_month: "02",
    exp_year: "21",
    cvc: "999",
    name: "Billy Joe"
  }
};

export default class App extends Component {
  state = {
    token: {},
    res: {}
  };

  async componentDidMount() {
    this.onPayment();
  }

  async onPayment() {
    var card = await stripe.createToken(information);
    var token = card.id;
    this.setState({ token });

    try {
      // const res = await axios.post(
      //   "http://192.168.56.1:5000/api/stripe",
      //   this.state.token,
      //   {
      //     headers: {
      //       "Access-Control-Allow-Origin": "*"
      //     }
      //   }
      // );
      const res = await fetch("http://192.168.56.1:5000/api/stripe", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        },
        body: token
      });
      this.setState({ res });
    } catch (e) {
      this.setState({ res: e });
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.paragraph}>{JSON.stringify(this.state.res)}</Text>
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
