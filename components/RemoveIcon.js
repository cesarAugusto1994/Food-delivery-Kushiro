import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const RemoveIcon = ({ size, onPress }) => {
  return <Icon name="remove" size={size} color="#900" onPress={onPress} />;
};

export default RemoveIcon;
