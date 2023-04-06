import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
// ...and so on for all the images

export const SBImageItem = ({ id, style, text, showIndex = true, src }) => {
  // console.log(text);
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
      {typeof src==="number"?<Image key={id} style={styles.image} source={src} />:<Image key={id} style={styles.image} src={src} />}
      {text && <Text
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
        {text}
      </Text>}
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
