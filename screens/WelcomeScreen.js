import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";

import Slide from "../components/Slide";

const SLIDE_DATA = [
  { text: "Welcome to the app", color: "#03A9F4" },
  {
    text:
      "Deliver food to your home from your favorite store quickly and easily.",
    color: "#009688"
  },
  { text: "Let's get started", color: "#03A9F4" }
];

export default class WelcomeScreen extends Component {
  async componentWillMount() {
    const isFirstTime = await AsyncStorage.getItem("isFirstTime");

    if (isFirstTime === "false") {
      this.props.navigation.navigate("Main");
    }
  }

  onSlidesComplete = async () => {
    await AsyncStorage.setItem("isFirstTime", "false");
    this.props.navigation.navigate("Main");
  };

  render() {
    return <Slide data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}
