import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E4E4E4",
        marginTop: 180,
        backgroundColor: "white",
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
          renderItem={({ index }) => <SBItem index={index} src={marketing_images[index]} pretty={true} text="" style={{"height":"100%", "width":"100%", "padding":10}} />}
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
      <View style={{ height: "10%"}}>
      <Text style={{
  fontFamily: "Roboto", // change the font family to your desired system font
  fontSize: 24, // increase the font size to make the text larger
  fontWeight: "bold", // add font weight to make the text bold
  color: "black", // change the color of the text
  textAlign: "center", // center the text
}}>
  {currentIndex === 0
    ? <Text>Interact with fun <Text style={{color: "purple"}}>personalities</Text></Text>
    : currentIndex === 1
    ? <Text>Engage in <Text style={{color: "purple"}}>long-form</Text> conversation</Text> 
    : currentIndex === 2
    ? <Text>Find your <Text style={{color: "purple"}}>solace</Text> on bad days</Text>
    : <Text>Unlock your <Text style={{color: "purple"}}>zen</Text></Text>
  }
</Text>
</View>
      <Pressable
        style={({ pressed }) => [
          styles.customButton,
          pressed ? styles.customButtonPressed : {},
        ]}
        onPress={() => {
          checkProfileAndRedirect();
        }}
      >
        <Image source={googleLogo} style={styles.logo} />
        <Text style={styles.customButtonText}>Continue with Google</Text>
      </Pressable>
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
    width: 36,
    height: 36,
  },
  customButtonPressed: {
    opacity: 0.8,
  },
  customButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 5,
    backgroundColor: "black",
    marginTop: 36,
    marginBottom: 36,
    marginLeft: 36,
    marginRight: 36,
  },
  customButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default WelcomeCarouselScreen;
