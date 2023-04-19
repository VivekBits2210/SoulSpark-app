import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import { window, normalize_font } from "../constants";

// Patreon icon
import image0 from "../assets/icon.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#F5FCFF",
  },
  touchableOpacity: {
    width: window.width,
    height: window.height * 0.6,
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    width: window.width * 0.4,
    height: window.height * 0.2,
    borderRadius: window.width / 10,
  },
  aboutText: {
    fontSize: normalize_font(16),
    fontFamily: "Roboto",
    color: "#333",
    textAlign: "left",
    padding: window.height / 25,
    lineHeight: normalize_font(25),
  },
  text: {
    fontSize: normalize_font(24),
    color: "white",
  },
});

export default function Coffee() {
  return (
    <View style={[styles.container, { backgroundColor: "#330044" }]}>
      <Text style={[styles.aboutText, { color: "white" }]}>
        SoulSpark aims to be the world's{" "}
        <Text style={{ fontStyle: "italic" }}>first and best</Text> long-term AI
        companion.
      </Text>
      <Text style={[styles.aboutText, { color: "white" }]}>
        We hope to build a persona which remains consistent months into the
        future and adapts the conversation to your mood and needs.
      </Text>
      <Text
        style={[
          styles.aboutText,
          { textAlign: "center", color: "white", fontStyle: "normal" },
        ]}
      >
        Help us make this vision a reality!{"\n\n"}Support us:
      </Text>
      <View style={{ flex: 1, width: window.width }}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() =>
            Linking.openURL("https://www.patreon.com/SoulSpark784/membership")
          }
        >
          <Image
            key={"key"}
            style={styles.image}
            source={image0}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
