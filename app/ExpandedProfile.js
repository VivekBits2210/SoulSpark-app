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

const { height } = Dimensions.get("window");

export default function ExpandedProfile() {
  const router = useRouter();
  const { name, age, bio, bot_id } = useSearchParams();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={require("../assets/0.jpg")}
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
                { backgroundColor: "rgba(255, 255, 255, 0.85)" },
              ]}
              onPress={handleBackPress}
              activeOpacity={0.65}
            >
              <Icon name={"up"} size={10} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={{ textAlign: "justify", padding: 30 }}>{bio}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 15,
  },
});
