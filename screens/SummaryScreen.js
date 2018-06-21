import _ from "lodash";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { PricingCard } from "react-native-elements";

import { handleConfirmedOrder } from "../actions";

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

  _keyExtractor = (item, index) => `${index}`;

  render() {
    if (!this.props.newOrder.stripeToken) {
      return (
        <ScrollView contentContainerStyle={styles.emptyWrapper}>
          <Text style={styles.listWrapperTitle}>
            You don't have any pending order
          </Text>
        </ScrollView>
      );
    }

    const {
      menu,
      totalCost,
      userLocation: { destAddress },
      stripeToken,
      timeToDest
    } = this.props.newOrder;

    return (
      <ScrollView>
        <View style={styles.listWrapper}>
          <Text style={styles.listWrapperTitle}>List of order item:</Text>
          <FlatList
            data={menu}
            renderItem={({ item }) => (
              <Text style={styles.listItem}>{`${item.name} * ${
                item.qty
              }`}</Text>
            )}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <PricingCard
          color="#F44336"
          title="Your new order"
          price={`${totalCost}￥`}
          info={[
            `Estimated arrival time: ${new Date(timeToDest)}`,
            `To address: ${destAddress}`,
            `Your purchase id: ${stripeToken}`
          ]}
          button={{ title: "Confirm delivery" }}
          onButtonPress={() => this._confirmSuccessfulDelivery()}
        />
      </ScrollView>
    );
  }
}

const styles = {
  emptyWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    paddingTop: 15
  },
  listItem: {
    backgroundColor: "#4f9deb",
    fontSize: 15,
    padding: 15,
    margin: 5
  },
  listWrapperTitle: {
    fontSize: 18,
    margin: 5,
    fontWeight: "bold"
  }
};

const mapStateToProps = state => {
  return {
    newOrder: { ...state.newOrder, menu: _.values(state.newOrder.menu) }
  };
};

export default connect(mapStateToProps, { handleConfirmedOrder })(
  SummaryScreen
);
