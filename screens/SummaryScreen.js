import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";

import { handleConfirmedOrder } from "../actions";
import { getTimeLeft } from "../helpers/timeLeftHelper";

class SummaryScreen extends Component {
  // show the current order and the eta time,
  // after the duration, show a button to user to confirm the status of the order
  // if done
  // empty the current order reducer and concat this order to prevOrders in redux-persist/AsyncStorages
  // if not
  // (brainstorm later)
  // everytime this summaryscreen is rendered, check if there is any pending order on the list, if no => best case
  // if yes, check the difference between date now(a) and estimated arrival time(b)
  // if a >= b, show button for user to confirm the delivery or report error
  // if a < b, show the order and how much time left

  constructor(props) {
    super(props);

    this.state = {
      isDelivered: false,
      timeLeft: 60 * 60
    };

    this.interval = "";
  }

  componentDidMount() {
    console.log("componentDidMount is called");
    if (this.props.newOrder.stripeToken) {
      console.log("_handleDelivery is called");
      this.setState({ isDelivered: false });
      this._handleDelivery();
    }
  }
  // when do we want this function to run ?
  // when user create an new order
  // componentDidUpdate(prevProps) {
  //   console.log("componentDidUpdate is called");
  //   console.log(prevProps.newOrder.timeLeft);
  //   console.log(this.props.newOrder.timeLeft);
  //   if (this.props.newOrder.stripeToken) {
  //     if (!this.state.isDelivered) {
  //       this._handleDelivery();
  //     } else {
  //       clearInterval(this.interval);
  //     }
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps is called");
    if (nextProps.newOrder.timeLeft === -1) {
      return {
        timeLeft: 60 * 60
      };
    } else if (prevState.timeLeft > nextProps.newOrder.timeLeft) {
      return {
        timeLeft: nextProps.newOrder.timeLeft
      };
    }

    return null;
  }

  // BUG: after confirm one order, create a new order will not run the countdown
  // BUG: try to update component state after getDerivedStateFromProps is not possible
  // FALLBACK SOLUTION: just show the exact real time on clock when it arrives.
  _handleDelivery = () => {
    if (this.state.timeLeft >= 0) {
      console.log("_countDown is called");
      this.interval = setInterval(() => this._countDown(), 1000);
    } else {
      console.log("_countDown is called");
      this._showConfirmButton();
    }
  };
  _countDown = () => {
    if (this.state.timeLeft > 0) {
      this.setState({ timeLeft: this.state.timeLeft - 1 });
    } else {
      clearInterval(this.interval);
      this._showConfirmButton();
    }
  };

  _showConfirmButton = () => {
    this.setState({ isDelivered: true });
  };

  _confirmSuccessfulDelivery = () => {
    this.props.handleConfirmedOrder(this.props.newOrder);
    this.setState({ isDelivered: false });
  };

  render() {
    // REFACTOR: check if an object is empty, lodash maybe????
    if (!this.props.newOrder.stripeToken) {
      return (
        <ScrollView>
          <Text>You don't have any pending order</Text>
          <Text>{`timeLeft state: ${this.state.timeLeft}`}</Text>
          <Text>{`isDelivered state/confirmed button shown: ${
            this.state.isDelivered
          }`}</Text>
        </ScrollView>
      );
    }

    const { menu, totalCost, destAddress, stripeToken } = this.props.newOrder;

    return (
      <ScrollView>
        <Text>{`You have a new order: ${JSON.stringify(menu, null, 4)}`}</Text>
        <Text>{`With total cost: ${totalCost}`}</Text>
        <Text>{`To address: ${destAddress}`}</Text>
        <Text>{`Your purchase id (stripe token): ${stripeToken}`}</Text>
        <Text>{`Estimated time for delivery: ${
          this.state.timeLeft
        } seconds`}</Text>
        {this.state.isDelivered && (
          <TouchableOpacity onPress={this._confirmSuccessfulDelivery}>
            <Text>Confirm delivery</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={this._confirmSuccessfulDelivery}>
          <Text>Confirm delivery</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

// REFACTOR: we will save newOrder into prevOrders after it is confirmed. Should we save timeLeft props somewhere and avoid put it in newOrder props ?
const mapStateToProps = state => {
  console.log("mapStateToProps is called");
  return {
    newOrder: {
      ...state.newOrder,
      timeLeft: getTimeLeft(state.newOrder.timeToDest)
      // timeLeft: 10
    }
  };
};

export default connect(mapStateToProps, { handleConfirmedOrder })(
  SummaryScreen
);
