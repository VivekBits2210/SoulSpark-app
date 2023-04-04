import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    height: 0.62 * height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 62,
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
    fontSize: 20,
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
  // expandButton: {
  //   width: 50, // Adjust the width as desired
  //   height: 0, // Adjust the height as desired
  // },
});
