import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from "react-redux";

import { handleConfirmedOrder } from "../actions";
import { getTimeLeft } from "../helpers/timeLeftHelper";

class SummaryScreen extends Component {
  static navigationOptions = {
    title: "Summary"
  };

  constructor(props) {
    super(props);

    this.state = {
      isDelivered: null
    };
  }

  componentDidMount() {
    console.log("componentDidMount is called");
    if (this.props.newOrder.stripeToken) {
      this.setState({ isDelivered: false });
    }
  }

  _confirmSuccessfulDelivery = () => {
    if (this.props.newOrder.timeToDest > new Date().getTime()) {
      return Alert.alert("Not Available", "Package is not delivered yet.");
    }
    this.setState({ isDelivered: null });
    this.props.handleConfirmedOrder(this.props.newOrder);
  };

  render() {
    if (!this.props.newOrder.stripeToken) {
      return (
        <ScrollView>
          <Text>You don't have any pending order</Text>
          <Text>{`isDelivered state/confirmed button shown: ${
            this.state.isDelivered
          }`}</Text>
        </ScrollView>
      );
    }

    const {
      menu,
      totalCost,
      userLocation: { destAddress },
      stripeToken
    } = this.props.newOrder;

    return (
      <ScrollView>
        <Text>{`You have a new order: ${JSON.stringify(menu, null, 4)}`}</Text>
        <Text>{`With total cost: ${totalCost}`}</Text>
        <Text>{`To address: ${destAddress}`}</Text>
        <Text>{`Your purchase id (stripe token): ${stripeToken}`}</Text>
        <Text>{`Estimated time to delivery: ${new Date(
          this.props.newOrder.timeToDest
        )} seconds`}</Text>
        <TouchableOpacity onPress={this._confirmSuccessfulDelivery}>
          <Text>Confirm delivery</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log("mapStateToProps is called");
  return {
    newOrder: state.newOrder
  };
};

export default connect(mapStateToProps, { handleConfirmedOrder })(
  SummaryScreen
);
