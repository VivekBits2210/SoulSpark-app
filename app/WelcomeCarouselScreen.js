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
  Button,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { SBItem } from "../components/SBItem";
import { user, window, normalize_font } from "../constants";

// Images
import googleLogo from "../assets/g-logo-black.jpg";
import m0 from "../assets/cropped_smiling_woman.jpg";
import m1 from "../assets/cropped_journey.jpg";
import m2 from "../assets/cropped_sad_day.jpg";
import m3 from "../assets/cropped_zen.jpg";

import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import { makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";

const redirectUri = makeRedirectUri({
  native: 'com.soulspark.testpublishapp:/oauth2redirect',
  useProxy: true,
});

const colors = ["#26292E", "#899F9C", "#B3C680", "#5C6265"];
const marketing_images = [m0, m1, m2, m3];

function WelcomeCarouselScreen({ navigation }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const progressValue = useSharedValue(0);

  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState();
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [pressedGoogleButton, setPressedGoogleButton] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "123407580501-bnpepikal9j1k7178c7v29au38ne7bsu.apps.googleusercontent.com",
    iosClientId:
      "123407580501-3m0u09eqspq7sk4oem79ssdjh736j7jp.apps.googleusercontent.com",
    expoClientId:
      "123407580501-s1iti9qokaqkeavio2ifptef48qiedo4.apps.googleusercontent.com",
    redirectUri: redirectUri,
    prompt: "select_account",
  });

  useEffect(() => {
    console.log("auth response", response);
    if (response && response?.type === "success") {
      setAuth(response.authentication);
    }
  }, [response]);
  
  useEffect(() => {
    if (auth) {
      const persistAuth = async () => {
        if(response){
          console.log("Response auth", response.authentication);
          await AsyncStorage.setItem(
            "auth",
            JSON.stringify(response.authentication)
          );
        }
      };
      persistAuth();
      getUserData();
    }
  }, [auth]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("auth");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        console.log("persisted auth", authFromJson);
        setAuth(authFromJson);
        
        setRequireRefresh(
          !AuthSession.TokenResponse.isTokenFresh({
            expiresIn: authFromJson.expiresIn,
            issuedAt: authFromJson.issuedAt,
          })
        );
      }
    };
    getPersistedAuth();
  }, []);

  useEffect(() => {
    if (userInfo) {
      if (!pressedGoogleButton) {
        const timer = setTimeout(() => {
          router.push("MyTabs");
        }, 2000); // 10 seconds
  
        return () => clearTimeout(timer);
      } else {
        router.push("FormScreen");
      }
    }
  }, [userInfo]);  
  

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      }
    );
  
    userInfoResponse.json().then((data) => {
      console.log("user info", data);
      setUserInfo(data);
    });
  };

  const getClientId = () => {
    if (Platform.OS === "ios") {
      return "123407580501-3m0u09eqspq7sk4oem79ssdjh736j7jp.apps.googleusercontent.com";
    } else if (Platform.OS === "android") {
      return "123407580501-bnpepikal9j1k7178c7v29au38ne7bsu.apps.googleusercontent.com";
    } else {
      console.log("Invalid platform - not handled");
    }
  };

  // const refreshToken = async () => {
  //   const clientId = getClientId();
  //   console.log(auth);
  //   const tokenResult = await AuthSession.refreshAsync(
  //     {
  //       clientId: clientId,
  //       refreshToken: auth.refreshToken,
  //     },
  //     {
  //       tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
  //     }
  //   );

  //   tokenResult.refreshToken = auth.refreshToken;

  //   setAuth(tokenResult);
  //   await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
  //   setRequireRefresh(false);
  // };

  // if (requireRefresh) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Token requires refresh...</Text>
  //       <Button title="Refresh Token" onPress={refreshToken} />
  //     </View>
  //   );
  // }

  const showUserData = () => {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text style={{ fontSize: 24 }}>Welcome {userInfo.name}</Text>
        </View>
      );
    }
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
        }}
      >
        <Carousel
          vertical={false}
          width={window.width}
          height={window.height * 0.65}
          style={{
            backgroundColor: "white",
          }}
          loop
          pagingEnabled={true}
          snapEnabled={true}
          autoPlay={true}
          autoPlayInterval={1800}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
          }}
          onSnapToItem={(index) => setCurrentIndex(index)}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 40,
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
            backgroundColor: "transparent",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            width: window.width / 3,
          }}
        >
          {colors.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={false}
                length={colors.length}
              />
            );
          })}
        </View>
      )}
      <View style={{ flex: 0.5, backgroundColor: "white" }}>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: normalize_font(20),
            color: "black",
            textAlign: "center",
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
              Find <Text style={{ color: "purple" }}>solace</Text> on difficult
              days
            </Text>
          ) : (
            <Text>
              Unlock your <Text style={{ color: "purple" }}>zen</Text>
            </Text>
          )}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          width: "100%",
        }}
      >
         {!auth ? (
          <Pressable
            style={({ pressed }) => [
              styles.customButton,
              pressed ? styles.customButtonPressed : {},
            ]}
            onPress={() => {
              promptAsync({ useProxy: true, showInRecents: true });
              setPressedGoogleButton(true);
            }}
          >
            <View style={{ flex: 0.2 }}>
              <Image source={googleLogo} style={styles.logo} />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.customButtonText}>Continue with Google</Text>
            </View>
          </Pressable>

          
          
        ) : (
          showUserData()
        )}
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
    marginLeft: "13%",
    height: "100%",
    width: "100%",
  },
  customButtonPressed: {
    opacity: 0.6,
  },
  customButton: {
    flex: 0.4,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: window.width * 0.65,
    borderRadius: 50,
    borderWidth: 5,
    backgroundColor: "black",
  },
  customButtonText: {
    color: "white",
    fontSize: normalize_font(16),
    fontFamily: "sans-serif",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeCarouselScreen;
