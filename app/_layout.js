import { Text, View, TouchableOpacity } from "react-native";
import { ScreenHeaderBtn } from "../components";
import { Stack, useRouter } from "expo-router";
import { HeaderBackButton } from "react-navigation-stack";
import UnmatchMenu from "./UnmatchMenu";
import { useSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { url_refresh_hack, aws_url, window, normalize_font } from "../constants";
import ScreenHeaderTitle from "../components/Header/ScreenHeaderTitle";

SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  initialRouteName: "index",
};
const Layout = () => {
  const router = useRouter();

  const { name, id } = useSearchParams();
  let src = `${aws_url}/${id}.jpg?url_refresh_hack=${url_refresh_hack}`;
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: true,
          headerLeft: () => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderBottomColor: "lightgrey",
                }}
              >
                <ScreenHeaderBtn
                  iconUrl={require("../assets/logo_better.png")}
                  dimension="150%"
                  handlePress={() => router.push("/Coffee")}
                />
                <View style={{ paddingLeft: "18%" }}>
                  <ScreenHeaderTitle src={require("../assets/logo_text.jpg")} />
                </View>
              </View>
            );
          },
          headerTitle: "",
        }}
        name="index"
      />
      <Stack.Screen
        options={{
          headerShadowVisible: true,
          headerTitleAlign: "center",
          // headerStyle: {height:200},
          header: () => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingTop: 10,
                  paddingBottom: 35,
                  alignItems: "center",
                  marginTop: 50,
                  borderBottomWidth: 0.5,
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
                    handlePress={()=>{}}
                  ></ScreenHeaderBtn>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: normalize_font(22),
                    paddingLeft: 10,
                  }}
                  onPress={()=>{}}
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
                  Profile
                </Text>
              </View>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                activeOpacity={0.94}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  SAVE
                </Text>
              </TouchableOpacity>
            );
          },
          headerTitle: "",
        }}
        name="Profile"
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerBackTitle: "",
          headerBackTitleVisible: false,
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
                  headerBackTitle=""
                  headerBackTitleVisible={false}
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
          headerShadowVisible: false,
          headerTitle: "",
        }}
        name="ExpandedProfile"
      />
    </Stack>
  );
};

export default Layout;
