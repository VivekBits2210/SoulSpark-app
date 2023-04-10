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
    // alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  touchableOpacity: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    width: "60%",
    height: "80%",
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
    <View style={[styles.container, {backgroundColor:"#330044"}]}>
      <Text style={[styles.aboutText, {color:'white'}]}>SoulSpark aims to be the world's <Text style={{fontStyle:"italic"}}>first and best</Text> long-term AI companion.</Text>
      <Text style={[styles.aboutText, {color:'white'}]}>We hope to build a persona which remains consistent months into the future and adapts the conversation to your mood and needs.</Text>
      <Text style={[styles.aboutText, {textAlign:"center",color:'white', fontStyle:"bold"}]}>Help make this vision a reality.{"\n\n"}Donate below:</Text>
      <View style={{flex: 1, width: "100%"}}>
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
          resizeMode="cover"
        />
      </TouchableOpacity>
      </View>
    </View>
  );
}
