import { StyleSheet } from "react-native";
import { window } from "../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  swiperContainer: {
    flex: 7,
    backgroundColor: "white"
  },
  buttonsContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
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
