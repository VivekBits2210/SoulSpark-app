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
    justifyContent: "flex-start",
    padding: 20,
    // alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  touchableOpacity: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: "65%",
    height: "100%",
    borderRadius: 75,
  },
  aboutText: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#333",
    textAlign: "left",
    padding: 30,
    lineHeight: 30,
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});

export default function Coffee() {
  return (
    <View style={[styles.container, {backgroundColor:"purple"}]}>
      <Text style={[styles.aboutText, {color:'white'}]}>SoulSpark aims to be the world's <Text style={{fontStyle:"italic"}}>first and best</Text> long-term AI companion.</Text>
      <Text style={[styles.aboutText, {color:'white'}]}>We hope to build a persona which remains consistent months into the future and adapts the conversation to your mood and needs.</Text>
      <Text style={[styles.aboutText, {color:'white'}]}>Help make this vision a reality!</Text>
      <View style={{alignItems: "center", padding: 20 }}>
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
      <Text style={styles.text}>Thank you.</Text>
      </View>
    </View>
  );
}
