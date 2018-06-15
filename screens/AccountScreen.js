import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

class AccountScreen extends Component {
  _renderCreditCard = () => {
    if (this.props.creditCard) {
      const { number, cvc, name, exp_month, exp_year } = this.props.creditCard;
      return (
        <ScrollView>
          <Text>{name}</Text>
          <Text>{number}</Text>
          <Text>{`${exp_month}/${exp_year}`}</Text>
          <Text>{cvc}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CreditCard")}
          >
            <Text>Add/Change Credit Card Info</Text>
          </TouchableOpacity>

          <Text>{`Previous orders: ${JSON.stringify(
            this.props.prevOrders,
            null,
            4
          )}`}</Text>
        </ScrollView>
      );
    }
  };

  render() {
    return (
      <View style={styles.contentContainer}>{this._renderCreditCard()}</View>
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
    creditCard: state.creditCard,
    prevOrders: state.prevOrders
  };
};

export default connect(mapStateToProps, null)(AccountScreen);
