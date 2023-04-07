import { Text, View, TouchableOpacity } from "react-native";
import { ScreenHeaderBtn } from "../components";
import { Stack, useRouter } from "expo-router";
import { HeaderBackButton } from "react-navigation-stack";
import UnmatchMenu from "./UnmatchMenu";
import { useSearchParams } from "expo-router";
import { Logo } from "./Logo";
import { LogoText } from "./LogoText";
import * as SplashScreen from "expo-splash-screen";
import { encrypEmail } from "../constants";
import ScreenHeaderTitle from "../components/Header/ScreenHeaderTitle";

SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};
const Layout = () => {
  const router = useRouter();

  const { name, id } = useSearchParams();
  let src = `https://soulspark-profile-pictures.s3.us-west-1.amazonaws.com/${id}.jpg?random_number=10`;
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <View
                style={{
                  flex: 1,
                  paddingLeft: 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ScreenHeaderBtn
                  iconUrl={require("../assets/logo_better.png")}
                  dimension="100%"
                  handlePress={() => router.push("/Coffee")}
                />
                {/* <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    paddingLeft: 5,
                    fontFamily: "Roboto",
                  }}
                  onPress={() => router.push("/Coffee")}
                >
                  SoulSpark
                </Text> */}
              </View>
            );
          },
          headerTitle: "",
        }}
        name="index"
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: true,
          headerTitleAlign: "center",
          header: () => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  alignItems: "center",
                  backgroundColor: "white",
                  height: 200,
                  marginTop: 50,
                  borderBottomColor: "lightgrey",
                }}
              >
                <ScreenHeaderBtn
                  iconUrl={require("../assets/logo_better.png")}
                  dimension="150%"
                  handlePress={() => router.push("/Coffee")}
                />
                <ScreenHeaderTitle src={require("../assets/logo_text.jpg")} />
                <ScreenHeaderBtn
                  iconUrl={require("../assets/profile.jpg")}
                  dimension="100%"
                  handlePress={() => router.push("/Settings")}
                />
              </View>
            );
          },
          // headerLeft: () => {
          //   return (
          //     <View
          //       style={{
          //         flex: 1,
          //         paddingLeft: 0,
          //         flexDirection: "row",
          //         alignItems: "center",
          //       }}
          //     >
          //       <ScreenHeaderBtn
          //         iconUrl={require("../assets/logo_better.png")}
          //         dimension="150%"
          //         handlePress={() => router.push("/Coffee")}
          //       />
          //       {/* <Text
          //         style={{
          //           color: "white",
          //           fontSize: 18,
          //           paddingLeft: 5,
          //           fontFamily: "Roboto",
          //         }}
          //         onPress={() => router.push("/Coffee")}
          //       >
          //         SoulSpark
          //       </Text> */}
          //     </View>
          //   );
          // },
          // headerRight: () => {
          //   return (
          //     <ScreenHeaderBtn
          //       iconUrl={require("../assets/profile.jpg")}
          //       dimension="100%"
          //       handlePress={() => router.push("/Settings")}
          //     />
          //   );
          // },
          headerTitle: "",
        }}
        name="MyTabs"
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerBackTitle: "",
          headerLeft: () => {
            return (
              <View
                style={{
                  flex: 1,
                  paddingLeft: 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <HeaderBackButton
                  tintColor="white"
                  onPress={() => router.back()}
                  style={{ paddingLeft: 0 }}
                ></HeaderBackButton>
                <TouchableOpacity activeOpacity={0.94}>
                  <ScreenHeaderBtn
                    iconUrl={{ uri: src }}
                    backgroundColor={"black"}
                    dimension="100%"
                    handlePress={() =>
                      router.push(`/Customization?name=${name}&id=${id}`)
                    }
                  ></ScreenHeaderBtn>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 22,
                    paddingLeft: 10,
                  }}
                  onPress={() =>
                    router.push(`/Customization?name=${name}&id=${id}`)
                  }
                >
                  {name}
                </Text>
              </View>
            );
          },
          headerRight: () => {
            return <UnmatchMenu id={id}></UnmatchMenu>;
          },
          headerTitle: "",
        }}
        name="ChatScreen"
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerBackTitle: "",
          headerLeft: () => {
            return (
              <View
                style={{
                  flex: 1,
                  paddingLeft: 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <HeaderBackButton
                  tintColor="white"
                  onPress={() => router.back()}
                  style={{ paddingLeft: 0 }}
                ></HeaderBackButton>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 22,
                    paddingLeft: 10,
                  }}
                >
                  Settings
                </Text>
              </View>
            );
          },
          headerTitle: "",
        }}
        name="Settings"
      />
      <Stack.Screen
        options={{
          // headerShown: false,
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerBackTitle: "",
          headerLeft: () => {
            return (
              <View
                style={{
                  flex: 1,
                  paddingLeft: 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <HeaderBackButton
                  tintColor="white"
                  onPress={() => router.back()}
                  style={{ paddingLeft: 0 }}
                ></HeaderBackButton>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 22,
                    paddingLeft: 10,
                  }}
                >
                  SoulSpark
                </Text>
              </View>
            );
          },
          headerTitle: "",
        }}
        name="Coffee"
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="WelcomeCarouselScreen"
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerBackTitle: "",
          headerLeft: () => {
            return (
              <View
                style={{
                  flex: 1,
                  paddingLeft: 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    paddingLeft: 5,
                    fontFamily: "Roboto",
                  }}
                >
                  Register
                </Text>
              </View>
            );
          },
          headerTitle: "",
        }}
        name="FormScreen"
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerBackTitle: "",
          headerLeft: () => {
            return (
              <View
                style={{
                  flex: 1,
                  paddingLeft: 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <HeaderBackButton
                  tintColor="white"
                  onPress={() => router.back()}
                  style={{ paddingLeft: 0 }}
                ></HeaderBackButton>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    paddingLeft: 5,
                    fontFamily: "Roboto",
                  }}
                >
                  Interests
                </Text>
              </View>
            );
          },
          headerTitle: "",
        }}
        name="InterestsScreen"
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerBackTitle: "",
          headerLeft: () => {
            return (
              <View
                style={{
                  flex: 1,
                  paddingLeft: 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <HeaderBackButton
                  tintColor="white"
                  onPress={() => router.back()}
                  style={{ paddingLeft: 0 }}
                ></HeaderBackButton>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 22,
                    paddingLeft: 10,
                  }}
                >
                  Customization
                </Text>
              </View>
            );
          },
          headerTitle: "",
        }}
        name="Customization"
      />
      <Stack.Screen
        options={{
          headerShown: false,
          // headerStyle: { backgroundColor: "black"},
          headerShadowVisible: false,
          // headerLeft: () => {
          // },
          // headerRight: () => {
          // },
          headerTitle: "",
        }}
        name="ExpandedProfile"
      />
    </Stack>
  );
};

export default Layout;
