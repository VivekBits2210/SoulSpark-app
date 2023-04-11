import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./IconButton.styles";

const IconButton = ({ onPress, name, backgroundColor, color, size }) => (
  <TouchableOpacity
    style={[styles.singleButton, { backgroundColor }]}
    onPress={onPress}
    activeOpacity={0.5}
  >
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);

export default IconButton;
