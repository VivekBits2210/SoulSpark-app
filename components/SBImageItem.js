import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import image0 from "../assets/0.jpg";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
// ...and so on for all the images

const images = [image0, image1, image2, image3];
const names = ["Nicole", "Sarika", "Shanaiya", "Chenguang"];

export const SBImageItem = ({ style, index: _index, showIndex = true }) => {
  const index = (_index || 0) + 1;
  const source = React.useRef({
    uri: `https://picsum.photos/id/${index}/400/300`,
  }).current;

  return (
    <View
      style={[
        styles.container,
        style,
        {
          justifyContent: "space-between", // Add justifyContent: 'space-between'
          flex: 1, // Add flex: 1
        },
      ]}
    >
      {/* <ActivityIndicator size="small" /> */}
      <Image key={index} style={styles.image} source={images[_index]} />
      <Text
        style={{
          position: "absolute",
          color: "white",
          fontSize: 20,
          backgroundColor: "#333333",
          borderRadius: 5,
          overflow: "hidden",
          paddingHorizontal: 10,
          paddingTop: 2,
          alignSelf: "flex-end", // Add alignSelf: 'flex-start'
          marginTop: "auto", // Add marginTop: 'auto'
        }}
      >
        {names[_index]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    // height: undefined,
    // position: "absolute",
    top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});
