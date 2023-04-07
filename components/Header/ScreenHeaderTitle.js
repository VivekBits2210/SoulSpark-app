import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

import styles from "./screenheader.style";

const ScreenHeaderTitle = ({ handlePress, backgroundColor, src }) => {
  const bcColor = backgroundColor ? backgroundColor : "white";
  return (
    <TouchableOpacity
      style={[styles.titleContainer, { backgroundColor: bcColor }]}
      onPress={handlePress}
    >
      <Image style={styles.titleImage} source={src}></Image>
    </TouchableOpacity>
  );
};

export default ScreenHeaderTitle;
