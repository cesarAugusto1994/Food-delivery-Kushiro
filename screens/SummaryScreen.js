import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class SummaryScreen extends Component {
  // show the current order and the eta time,
  // after the duration, show a button to user to confirm the status of the order
  // if done
  // empty the current order reducer and concat this order to prevOrders in redux-persist/AsyncStorages
  // if not
  // (brainstorm later)
  render() {
    // REFACTOR: check if an object is empty, lodash maybe????
    if (
      Object.keys(this.props.newOrder).length === 0 &&
      this.props.newOrder.constructor === Object
    ) {
      return <Text>You don't have any pending order</Text>;
    }

    const { menu, totalCost, toAddress, stripeToken } = this.props.newOrder;

    return (
      <View>
        <Text>{`You have a new order: ${JSON.stringify(menu, null, 4)}`}</Text>
        <Text>{`With total cost: ${totalCost}`}</Text>
        <Text>{`To address: ${toAddress}`}</Text>
        <Text>{`Your purchase id (stripe token): ${stripeToken}`}</Text>
        <Text>{`Estimated time to destination: (WORKING)`}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    newOrder: state.newOrder
  };
};

export default connect(mapStateToProps, null)(SummaryScreen);
