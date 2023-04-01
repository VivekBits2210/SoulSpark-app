import React from "react";
import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const SButton = (props) => {
  const { children, visible = true, onPress } = props;

  if (!visible)
    return <></>;

  return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            // marginTop: 20,
            backgroundColor: "#26292E",
            borderRadius: 50,
            paddingHorizontal: 25,
            paddingVertical: 20,
          }}
        >
          <Text style={{ color: "white" }}>{children}</Text>
        </View>
      </TouchableWithoutFeedback>
  );
};

export default SButton;
