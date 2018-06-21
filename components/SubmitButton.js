import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";

export default props => {
  const _handleSubmit = () => {
    return Alert.alert("Confirm", "Are you sure?", [
      {
        text: "Yes",
        onPress: () => {
          props.onPress();
        }
      },
      {
        text: "No",
        onPress: () => false
      }
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => _handleSubmit()}
    >
      <Text style={styles.textButtonStyle}>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#DDDDDD",
    padding: 15
  },
  textButtonStyle: {
    fontSize: 15,
    fontWeight: "bold"
  }
};
