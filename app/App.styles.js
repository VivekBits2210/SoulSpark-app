import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    // justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "white",
  },
  swiperContainer: {
    marginTop: 20,
    height: height * 0.75,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: "2%",
    alignItems: "flex-start",
    // position: "relative",
    // paddingBottom: height*0.01,
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
