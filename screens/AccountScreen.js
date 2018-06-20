import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Constants, LinearGradient } from "expo";
import { connect } from "react-redux";
import { PricingCard } from "react-native-elements";

class AccountScreen extends Component {
  static navigationOptions = {
    title: "Account"
  };

  _renderCreditCard = () => {
    if (!this.props.creditCard) {
      return (
        <View>
          <Text>You haven't submitted any credit card info.</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CreditCard")}
          >
            <Text>Add one here</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const { number, cvc, name, exp_month, exp_year } = this.props.creditCard;
    return (
      <View>
        <PricingCard
          color="#4f9deb"
          title={name}
          info={[number, `${exp_month}/${exp_year}`, cvc]}
          button={{ title: "Add/Change Credit Card Info" }}
          onButtonPress={() =>
            this.props.navigation.navigate("CreditCard", {
              returnToScreen: "Account"
            })
          }
        />
      </View>
    );
  };

  _renderPrevOrders = () => {
    if (!this.props.prevOrders) {
      return (
        <Text style={styles.paragraph}>You haven't made any orders yet.</Text>
      );
    }

    return this.props.prevOrders.map((order, i) => (
      <LinearGradient
        key={i}
        colors={["#FF9800", "#F44336"]}
        style={{
          padding: 15,
          justifyContent: "center",
          borderRadius: 5,
          marginTop: 10
        }}
        start={[1, 0]}
        end={[0.2, 0]}
      >
        <Text
          style={{
            backgroundColor: "transparent",
            fontSize: 18,
            color: "#fff",
            textAlign: "center"
          }}
        >
          {`Order ${i}`}
        </Text>
        <Text>{`Order made at: ${new Date(order.orderMadeAt)}`}</Text>
        <Text>{`Total cost: ${order.totalCost}￥`}</Text>
        <Text>{`Name of restaurant: ${order.restaurant.name}`}</Text>
        <Text>{`Deliver to address: ${order.userLocation.destAddress}`}</Text>
      </LinearGradient>
    ));
  };

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        {this._renderCreditCard()}
        <Text style={styles.paragraph}>Your last 3 orders</Text>
        {this._renderPrevOrders()}
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
    creditCard: state.creditCard,
    prevOrders: state.prevOrders
  };
};

export default connect(mapStateToProps, null)(AccountScreen);
