import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import image0 from "../assets/icon.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  touchableOpacity: {
    width: "100%",
    height: "50%",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default function Coffee() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() =>
          Linking.openURL("https://www.patreon.com/SoulSpark784/membership")
        }
      >
        <Image
          key={"dfsdfsd"}
          style={styles.image}
          source={image0}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={styles.text}>Buy me a coffee</Text>
    </View>
  );
}
