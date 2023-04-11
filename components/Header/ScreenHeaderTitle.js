import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

import styles from "./screenheader.style";

const ScreenHeaderTitle = ({
  handlePress,
  backgroundColor,
  src,
  imageHeight,
}) => {
  imageHeight = imageHeight ? imageHeight : 60;
  const bcColor = backgroundColor ? backgroundColor : "white";
  return (
    <TouchableOpacity
      style={[styles.titleContainer, { backgroundColor: bcColor }]}
      onPress={handlePress}
    >
      <Image
        style={[
          styles.titleImage,
          { height: imageHeight, width: imageHeight * 2 },
        ]}
        source={src}
      ></Image>
    </TouchableOpacity>
  );
};

export default ScreenHeaderTitle;
