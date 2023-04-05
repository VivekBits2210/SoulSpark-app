import { Text, View, TouchableOpacity } from "react-native";
import { ScreenHeaderBtn } from "../components";
import { Stack, useRouter } from "expo-router";
import { HeaderBackButton } from "react-navigation-stack";
import UnmatchMenu from "./UnmatchMenu";
import { useSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { encrypEmail } from "../constants";

SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};
const Layout = () => {
  const router = useRouter();

  const { name, id } = useSearchParams();
  let src = `https://soulspark-profile-pictures.s3.us-west-1.amazonaws.com/${id}.jpg`;
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <ScreenHeaderBtn
                iconUrl={require("../assets/soulspark_logo.png")}
                dimension="100%"
                handlePress={() => router.push("/Coffee")}
              />
            );
          },
          headerRight: () => {
            return (
              <ScreenHeaderBtn
                iconUrl={require("../assets/profile.jpg")}
                dimension="100%"
                handlePress={() => router.push("/Settings")}
              />
            );
          },
          headerTitle: "",
        }}
        name="index"
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <ScreenHeaderBtn
                iconUrl={require("../assets/soulspark_logo.png")}
                dimension="100%"
                handlePress={() => router.push("/Coffee")}
              />
            );
          },
          headerRight: () => {
            return (
              <ScreenHeaderBtn
                iconUrl={require("../assets/profile.jpg")}
                dimension="100%"
                handlePress={() => router.push("/Settings")}
              />
            );
          },
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
              <View style={{ flex: 1, paddingLeft: 0, flexDirection: "row" }}>
                <HeaderBackButton
                  tintColor="white"
                  onPress={() => router.back()}
                  style={{ paddingLeft: 0 }}
                ></HeaderBackButton>
                <TouchableOpacity activeOpacity={0.94}>
                  <ScreenHeaderBtn
                    iconUrl={{ uri: src }}
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
            return <UnmatchMenu></UnmatchMenu>;
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
              <View style={{ flex: 1, paddingLeft: 0, flexDirection: "row" }}>
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
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerBackTitle: "",
          headerLeft: () => {
            return (
              <View style={{ flex: 1, paddingLeft: 0, flexDirection: "row" }}>
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
              <View style={{ flex: 1, paddingLeft: 0, flexDirection: "row" }}>
                <HeaderBackButton
                  tintColor="white"
                  onPress={() => router.back()}
                  style={{ paddingLeft: 0 }}
                ></HeaderBackButton>
              <ScreenHeaderBtn
                iconUrl={require("../assets/soulspark_logo.png")}
                dimension="100%"
                handlePress={() => router.push("/Coffee")}
              />
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
              <View style={{ flex: 1, paddingLeft: 0, flexDirection: "row" }}>
                <HeaderBackButton
                  tintColor="white"
                  onPress={() => router.back()}
                  style={{ paddingLeft: 0 }}
                ></HeaderBackButton>
              <ScreenHeaderBtn
                iconUrl={require("../assets/soulspark_logo.png")}
                dimension="100%"
                handlePress={() => router.push("/Coffee")}
              />
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
              <View style={{ flex: 1, paddingLeft: 0, flexDirection: "row" }}>
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
