import { StyleSheet } from "react-native";
import { window } from "../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  swiperContainer: {
    marginTop: -12.5,
    height: window.height * 0.75,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: "2%",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingHorizontal: "15%",
  },
  overlayWrapper: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: 30,
    marginLeft: -30,
  },
});
