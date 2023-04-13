import { Buffer } from "buffer";
import { Text, View, TouchableOpacity } from "react-native";
import { ScreenHeaderBtn } from "../components";
import { useRouter } from "expo-router";
import { HeaderBackButton } from "react-navigation-stack";
import UnmatchMenu from "./UnmatchMenu";
import { useSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  url_refresh_hack,
  aws_url,
  window,
  normalize_font,
} from "../constants";
import ScreenHeaderTitle from "../components/Header/ScreenHeaderTitle";
import { createStackNavigator } from '@react-navigation/stack';
import FormScreen from './FormScreen';
import WelcomeCarouselScreen from "./WelcomeCarouselScreen";
import MyTabs from "./MyTabs";
import ChatScreen from "./ChatScreen";
import Index from "./index";
import Coffee from "./Coffee";
import Customization from "./Customization";
import InterestsScreen from "./InterestsScreen";
import Profile from "./Profile";
import Settings from "./Settings";
import ExpandedProfile from "./ExpandedProfile";
import Unmatch from "./Unmatched";
import User from "./[user]";
import Missing from "./missing";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const Layout = () => {
  const router = useRouter();
  const { name, id, encryption, picture } = useSearchParams();
  let src = `${aws_url}/${id}.jpg?url_refresh_hack=${url_refresh_hack}`;
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen
        options={{
          headerShown: true,
          gestureEnabled: false,
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
        component={Index}
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
                  iconUrl={require("../assets/profile.png")}
                  // iconUrl={{uri:Buffer.from(picture, "hex").toString()}}
                  dimension="100%"
                  handlePress={() => router.push("/Settings")}
                />
              </View>
            );
          },
          headerTitle: "",
        }}
        name="MyTabs"
        component={MyTabs}
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
                    handlePress={() => {}}
                  ></ScreenHeaderBtn>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: normalize_font(22),
                    paddingLeft: 10,
                  }}
                  onPress={() => {}}
                >
                  {name}
                </Text>
              </View>
            );
          },
          headerRight: () => {
            return <UnmatchMenu id={id} encryption={encryption}></UnmatchMenu>;
          },
          headerTitle: "",
        }}
        name="ChatScreen"
        component={ChatScreen}
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
        component={Settings}
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
          headerTitle: "",
        }}
        name="Profile"
        component={Profile}
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
        component={Coffee}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "white" },
          gestureEnabled: false,
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
        name="WelcomeCarouselScreen"
        component={WelcomeCarouselScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          gestureEnabled: false,
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
        component={FormScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          gestureEnabled: false,
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
                  Interests
                </Text>
              </View>
            );
          },
          headerTitle: "",
        }}
        name="InterestsScreen"
        component={InterestsScreen}
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
        component={Customization}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
        }}
        name="ExpandedProfile"
        component={ExpandedProfile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
        }}
        name="Unmatched"
        component={Unmatch}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
        }}
        name="missing"
        component={Missing}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
        }}
        name="[user]"
        component={User}
      />
    </Stack.Navigator>
  );
};

export default Layout;
