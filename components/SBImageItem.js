import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { url_refresh_hack } from "../constants";

export const SBImageItem = ({
  id,
  style,
  text,
  showIndex = true,
  src,
  borderRadius,
}) => {
  const borderStyle = borderRadius ? { borderRadius: borderRadius } : {};
  if (typeof src !== "number") {
    src += `?url_refresh_hack=${url_refresh_hack}`;
  }
  return (
    <View
      style={[
        styles.container,
        style,
        {
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: 1,
        },
      ]}
    >
      {typeof src === "number" ? (
        <Image key={id} style={[styles.image, borderStyle]} source={src} />
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
    resizeMode: "cover",
  },
});
