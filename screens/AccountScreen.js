import React, { Component } from "react";
import { Text, View } from "react-native";
import { Constants } from "expo";

class AccountScreen extends Component {
  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>Account Screen</Text>
        <Text style={styles.paragraph}>Account Screen</Text>
        <Text style={styles.paragraph}>Account Screen</Text>
        <Text style={styles.paragraph}>Account Screen</Text>
        <Text style={styles.paragraph}>Account Screen</Text>
        <Text style={styles.paragraph}>Account Screen</Text>
      </View>
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

export default AccountScreen;
