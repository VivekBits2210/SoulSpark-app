import { StyleSheet } from "react-native";
import { normalize_font, window } from "../../constants";

export default StyleSheet.create({
  card: {
    flex: 0.72,
    marginTop: -30,
    // height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: window.width / 100,
      height: 2,
    },
    // marginTop: -window.height / 15,
    // marginBottom: window.height / 4.5,
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    borderRadius: 10,
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
    // flex: 5,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  text: {
    textAlign: "left",
    fontSize: normalize_font(21),
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
});
