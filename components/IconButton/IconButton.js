import React from "react";
import { TouchableOpacity } from "react-native";
import { func, string } from "prop-types";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./IconButton.styles";
import { colors } from "../../constants";

const IconButton = ({ onPress, name, backgroundColor, color, size }) => (
  <TouchableOpacity
    style={[styles.singleButton, { backgroundColor }]}
    onPress={onPress}
    activeOpacity={0.65}
  >
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);

IconButton.propTypes = {
  onPress: func.isRequired,
  name: string.isRequired,
  color: string,
  backgroundColor: string,
};

IconButton.defaultProps = {
  color: colors.white,
  backgroundColor: colors.heartColor,
};

export default IconButton;
