import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

class AccountScreen extends Component {
  // check if credit card exist, show the current credit card, else show a message saying 'you don't submit any billing info yet'
  // have a button to let user submit credit card info
  //
  // have a list of previous and done orders
  _renderCreditCard = () => {
    if (this.props.creditCard) {
      const { number, cvc, name, exp_month, exp_year } = this.props.creditCard;
      return (
        <View>
          <Text style={styles.paragraph}>{name}</Text>
          <Text style={styles.paragraph}>{number}</Text>
          <Text style={styles.paragraph}>{`${exp_month}/${exp_year}`}</Text>
          <Text style={styles.paragraph}>{cvc}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CreditCard")}
          >
            <Text>Add/Change Credit Card Info</Text>
          </TouchableOpacity>
        </View>
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
    creditCard: state.creditCard
  };
};

export default connect(mapStateToProps, null)(AccountScreen);
