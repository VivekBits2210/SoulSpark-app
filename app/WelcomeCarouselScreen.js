import * as React from "react";
// import TimeZone from 'react-native-timezone';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  Platform,
  PixelRatio
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { encrypEmail } from "../constants";
import { SBItem } from "../components/SBItem";
import { window } from "../constants";
import googleLogo from "../assets/g-logo-black.jpg";
import m0 from "../assets/cropped_smiling_woman.jpg";
import m1 from "../assets/cropped_journey.jpg";
import m2 from "../assets/cropped_sad_day.jpg";
import m3 from "../assets/cropped_zen.jpg";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

const normalize = ((size)=>{
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4
  }
});

const PAGE_WIDTH = window.width;
const colors = ["#26292E", "#899F9C", "#B3C680", "#5C6265"];
const marketing_images = [m0, m1, m2, m3];

function WelcomeCarouselScreen({ navigation }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVertical, setIsVertical] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const progressValue = useSharedValue(0);

  const checkProfileAndRedirect = () => {
    fetch(
      `https://api-soulspark.com/user-profiles/fetch-user-info?email=${encrypEmail}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.age && json.gender) {
          if (!json.interests) {
            router.push("InterestsScreen");
          } else router.replace("MyTabs");
        } else router.push("FormScreen");
      });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 5,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Carousel
          vertical={false}
          width={PAGE_WIDTH}
          height={"100%"}
          style={{
            backgroundColor: "white",
          }}
          loop
          pagingEnabled={pagingEnabled}
          snapEnabled={snapEnabled}
          autoPlay={autoPlay}
          autoPlayInterval={1800}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
            // setCurrentIndex(Math.round(absoluteProgress * (colors.length - 1)));
          }}
          onSnapToItem={(index) => setCurrentIndex(index)}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={colors}
          renderItem={({ index }) => (
            <SBItem
              index={index}
              src={marketing_images[index]}
              style={{ backgroundColor: "white" }}
            />
          )}
        />
      </View>
      {!!progressValue && (
        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: "30%",
            marginBottom: "3%",
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
      <View style={{ flex: 0.5, backgroundColor: "white",}}>
        <Text
          style={{
            fontFamily: "Roboto", // change the font family to your desired system font
            fontSize: normalize(20), // increase the font size to make the text larger
            color: "black", // change the color of the text
            textAlign: "center", // center the text
          }}
        >
          {currentIndex === 0 ? (
            <Text>
              Interact with fun{" "}
              <Text style={{ color: "purple" }}>personalities</Text>
            </Text>
          ) : currentIndex === 1 ? (
            <Text>
              Engage in <Text style={{ color: "purple" }}>long-form</Text>{" "}
              conversation
            </Text>
          ) : currentIndex === 2 ? (
            <Text>
              Find <Text style={{ color: "purple" }}>solace</Text> on difficult days
            </Text>
          ) : (
            <Text>
              Unlock your <Text style={{ color: "purple" }}>zen</Text>
            </Text>
          )}
        </Text>
      </View>
      <View  style={{ flex: 1, alignItems: "center", backgroundColor: "white", width: "100%"}}>
      <Pressable
        style={({ pressed }) => [
          styles.customButton,
          pressed ? styles.customButtonPressed : {},
        ]}
        onPress={() => {
          checkProfileAndRedirect();
        }}
      >
        <View style={{ flex: 0.2}}>
        <Image source={googleLogo} style={styles.logo} />
        </View>
        <View style={{flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Text style={styles.customButtonText}>Continue with Google</Text>
        </View>
      </Pressable>
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
  logo: {
    resizeMode: "contain",
    marginLeft: "30%",
    height: "100%",
    width: "100%"
  },
  customButtonPressed: {
    opacity: 0.6,
  },
  customButton: {
    flex: 0.4,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "60%",
    borderRadius: 50,
    borderWidth: 5,
    backgroundColor: "black",

  },
  customButtonText: {
    color: "white",
    fontSize: normalize(17),
    fontFamily: "sans-serif"
  },
});

export default WelcomeCarouselScreen;
