import { Text } from 'react-native'
import { ScreenHeaderBtn } from '../components'
import { Stack, useRouter  } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};
const Layout = () => {
  const router = useRouter();
return (<Stack>
<Stack.Screen options={{
headerStyle: { backgroundColor: "black"},
headerShadowVisible: false,
headerLeft: () => {
return <Text style={{color:"white"}}>Soulspark Logo</Text>
},
headerRight: () => {
return <ScreenHeaderBtn iconUrl={require('../assets/profile.jpg')} dimension="100%" handlePress={() => router.push("/MySettingsScreen")} />
},
headerTitle: ""
}}
name="index"
/>
</Stack>);
}

export default Layout;