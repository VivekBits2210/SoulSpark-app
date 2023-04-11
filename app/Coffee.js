import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  StyleSheet,
  Dimensions, 
  Platform,
  PixelRatio
} from "react-native";
import image0 from "../assets/icon.png";


const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


const normalize = ((size)=>{
  const scale = SCREEN_WIDTH / 320;
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  touchableOpacity: {
    width: "100%",
    height: "60%",
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    width:  SCREEN_WIDTH*0.4,
    height: SCREEN_HEIGHT*0.2,
    borderRadius: SCREEN_WIDTH/10,
  },
  aboutText: {
    fontSize: normalize(16),
    fontFamily: "Roboto",
    color: "#333",
    textAlign: "left",
    padding: SCREEN_HEIGHT/25,
    lineHeight: normalize(25),
  },
  text: {
    fontSize: normalize(24),
    color: "white",
  },
});

export default function Coffee() {
  return (
    <View style={[styles.container, {backgroundColor:"#330044"}]}>
      <Text style={[styles.aboutText, {color:'white'}]}>SoulSpark aims to be the world's <Text style={{fontStyle:"italic"}}>first and best</Text> long-term AI companion.</Text>
      <Text style={[styles.aboutText, {color:'white'}]}>We hope to build a persona which remains consistent months into the future and adapts the conversation to your mood and needs.</Text>
      <Text style={[styles.aboutText, {textAlign:"center",color:'white', fontStyle:"normal"}]}>Help us make this vision a reality!{"\n\n"}Donate below:</Text>
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
          resizeMode="contain"
        />
      </TouchableOpacity>
      </View>
    </View>
  );
}
