import { StyleSheet } from "react-native";
import { window } from "../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  swiperContainer: {
    flex: 9,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "15%",
    paddingBottom: "3%",
  },
  overlayWrapper: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: 30,
    marginLeft: -30,
  },
});
