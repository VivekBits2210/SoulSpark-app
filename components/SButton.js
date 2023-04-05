import React from "react";
import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const SButton = (props) => {
  const { children, visible = true, disabled = true, onPress } = props;

  if (!visible) return <></>;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={disabled ? style.buttonDisabled : style.loginButton}>
        <Text style={{ color: "white", textAlign: "center" }}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  loginButton: {
    // marginTop: 20,
    backgroundColor: "#26292E",
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
});

export default SButton;
