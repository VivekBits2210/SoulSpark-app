import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    borderRadius: 12 / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: 50,
  }),
  titleContainer: {
    display: "flex",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  titleImage: {
    marginTop: 10,
    height: 60,
    width: 120,
    objectFit: "contain",
  },
});

export default styles;
