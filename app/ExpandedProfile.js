import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";
import { url_refresh_hack, aws_url, window, normalize_font } from "../constants";


export default function ExpandedProfile() {
  const router = useRouter();
  const { name, age, bio, photo, bot_id } = useSearchParams();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: `${aws_url}/${bot_id}.jpg?url_refresh_hack=${url_refresh_hack}`,
          }}
          resizeMode="cover"
        />
        <View style={styles.photoDescriptionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {`${name}, ${age}`}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.singleButton, { backgroundColor: "black" }]}
              onPress={handleBackPress}
              activeOpacity={0.65}
            >
              <Icon
                name={"caretup"}
                size={window.height / 50}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text
        style={{
          textAlign: "justify",
          fontFamily: "Roboto",
          fontSize: normalize_font(17),
          padding: window.height/25,
          textShadowColor: "grey",
          textShadowRadius: 2,
        }}
      >
        {bio}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 0.8 * window.height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
  photoDescriptionContainer: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 10,
  },
  textContainer: {
    flex: 5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  text: {
    textAlign: "left",
    fontSize: normalize_font(24),
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 10,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 10,
  },
  singleButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 9,
    shadowOpacity: 0.4,
    elevation: 2,
    padding: 15,
  },
});
