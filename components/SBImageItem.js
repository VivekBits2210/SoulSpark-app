import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { random_number } from "../constants";
// ...and so on for all the images

export const SBImageItem = ({ id, style, text, showIndex = true, src, borderRadius }) => {
  // console.log(text);
  const borderStyle = borderRadius?{"borderRadius":borderRadius}:{}
  if (typeof src !== "number") {
    src += `?random_number=${random_number}`;
  }
  return (
    <View
      style={[
        styles.container,
        style,
        {
          flexDirection: "column",
          justifyContent: "flex-end", // Add justifyContent: 'space-between'
          flex: 1, // Add flex: 1
        },
      ]}
    >
      {typeof src === "number" ? (
        <Image key={id} style={[styles.image,borderStyle]} source={src} />
      ) : (
        <Image key={id} style={styles.image} src={src} />
      )}
      {text && (
        <Text
          style={{
            position: "absolute",
            color: "white",
            fontSize: 20,
            textShadowColor: "black",
            borderRadius: 5,
            textShadowRadius: 10,
            overflow: "hidden",
            paddingHorizontal: 10,
            paddingTop: 2,
            paddingLeft: 12,
            paddingBottom: 12,
            alignSelf: "flex-start", // Add alignSelf: 'flex-start'
            marginTop: "auto", // Add marginTop: 'auto'
          }}
        >
          {text}
        </Text>
      )}
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
