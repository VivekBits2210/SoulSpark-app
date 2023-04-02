import * as React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Stack, useRouter } from "expo-router";

import { SBItem } from "../components/SBItem";
import SButton from "../components/SButton";
import { ElementsText, window } from "../constants";

const PAGE_WIDTH = window.width;
const colors = [
  "#26292E",
  "#899F9C",
  "#B3C680",
  "#5C6265",
];

function WelcomeCarouselScreen({ navigation }) {
  const router = useRouter();
  const [isVertical, setIsVertical] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const progressValue = useSharedValue(0);
  const baseOptions = isVertical
    ? {
        vertical: true,
        width: PAGE_WIDTH * 0.86,
        height: Dimensions.get("window").height,
      }
    : {
        vertical: false,
        width: PAGE_WIDTH,
        height: window.height * 0.6,
      };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E4E4E4",
        marginTop: 150,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: Dimensions.get("window").height * 0.42, // adjust this value for the desired carousel height
        }}
      >
        <Carousel
          {...baseOptions}
          style={{
            width: PAGE_WIDTH,
            height: Dimensions.get("window").height,
            marginTop: window.height * 0.2,
          }}
          loop
          pagingEnabled={pagingEnabled}
          snapEnabled={snapEnabled}
          autoPlay={autoPlay}
          autoPlayInterval={1500}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={colors}
          renderItem={({ index }) => <SBItem index={index} />}
        />
      </View>
      {!!progressValue && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 100,
            marginBottom: 20, // adjust this value to add spacing between the dots and the login button
          }}
        >
          {colors.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={isVertical}
                length={colors.length}
              />
            );
          })}
        </View>
      )}
      <Text style={styles.baseText}>Marketing Text</Text>
      <View style={styles.loginButtonContainer}>
        <SButton
          onPress={() => {
            router.push("FormScreen");
          }}
          style={styles.loginButton}
        >
          Login with Google
        </SButton>
      </View>
    </View>
  );
}

const PaginationItem = (props) => {
  const { animValue, index, length, backgroundColor, isRotate } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: "white",
        width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loginButtonContainer: {
    marginBottom: 20,
    bottom: 20,
    alignSelf: "center", // center login button horizontally
  },
  loginButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  baseText: {
    marginBottom: 50,
  },
});

export default WelcomeCarouselScreen;
