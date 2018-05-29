import React, { Component } from "react";
import { Text, View } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

class AccountScreen extends Component {
  _renderCreditCard = () => {
    if (this.props.creditCard) {
      const { number, cvc, name, exp_month, exp_year } = this.props.creditCard;
      return (
        <View>
          <Text style={styles.paragraph}>{name}</Text>
          <Text style={styles.paragraph}>{number}</Text>
          <Text style={styles.paragraph}>{`${exp_month}/${exp_year}`}</Text>
          <Text style={styles.paragraph}>{cvc}</Text>
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
