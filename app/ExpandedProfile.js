import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";
import { random_number } from "../constants";

const { height } = Dimensions.get("window");

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
            uri: `https://soulspark-profile-pictures.s3.us-west-1.amazonaws.com/${bot_id}.jpg?random_number=${random_number}`,
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
              style={[
                styles.singleButton,
                { backgroundColor: "black" },
              ]}
              onPress={handleBackPress}
              activeOpacity={0.65}
            >
              <Icon name={"caretup"} size={20} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={{ textAlign: "justify", fontFamily: "Roboto", fontSize: 16, padding: 30, textShadowColor: "grey", textShadowRadius: 2 }}>{bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 0.85 * height,
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
  heroContainer: {
    marginTop: 40,
    marginBottom: 50,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    flexDirection: "row",
  },
  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "black",
    marginHorizontal: 20,
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
    fontSize: 25,
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
