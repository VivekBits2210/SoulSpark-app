import { Text, View, TouchableOpacity  } from 'react-native'
import { ScreenHeaderBtn } from '../components'
import { Stack, useRouter  } from "expo-router";
import { HeaderBackButton } from 'react-navigation-stack';
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const handleItemClick = () => {
  
}
console.log("hey");
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
return <ScreenHeaderBtn iconUrl={require('../assets/profile.jpg')} dimension="100%" handlePress={() => router.push("/Settings")} />
},
headerTitle: ""
}}
name="index"
/>
<Stack.Screen options={{
headerStyle: { backgroundColor: "black"},
headerShadowVisible: false,
headerBackTitle:'Back',
headerLeft: () => {
return (
  <View style={{flex:1, paddingLeft:0, flexDirection: 'row'}}>
<HeaderBackButton tintColor="white" onPress={()=>router.back()} style={{paddingLeft:0}}></HeaderBackButton>
<TouchableOpacity activeOpacity={0.94}>
<ScreenHeaderBtn iconUrl={require('../assets/0.jpg')} dimension="100%" handlePress={() => router.push("/Customization")}>
</ScreenHeaderBtn></TouchableOpacity>
  <Text style={{color:"white", alignSelf: 'center', fontSize: 22, paddingLeft: 10}} onPress={() => router.push("/Customization")}>Nicole</Text>
  </View>
  )
},
headerTitle: ""
}}
name="ChatScreen"
/>
<Stack.Screen options={{
headerStyle: { backgroundColor: "black"},
headerShadowVisible: false,
headerBackTitle:'Back',
headerLeft: () => {
return (
  <View style={{flex:1, paddingLeft:0, flexDirection: 'row'}}>
<HeaderBackButton tintColor="white" onPress={()=>router.back()} style={{paddingLeft:0}}></HeaderBackButton>
{/* <ScreenHeaderBtn iconUrl={require('../assets/0.jpg')} dimension="100%" handlePress={() => router.push("/Settings")}>
</ScreenHeaderBtn> */}
  <Text style={{color:"white", alignSelf: 'center', fontSize: 22, paddingLeft: 10}}>Settings</Text>

  </View>
  )
},
headerTitle: ""
}}
name="Settings"
/>
<Stack.Screen options={{
headerStyle: { backgroundColor: "black"},
headerShadowVisible: false,
headerBackTitle:'Back',
headerLeft: () => {
return (
  <View style={{flex:1, paddingLeft:0, flexDirection: 'row'}}>
<HeaderBackButton tintColor="white" onPress={()=>router.back()} style={{paddingLeft:0}}></HeaderBackButton>
{/* <ScreenHeaderBtn iconUrl={require('../assets/0.jpg')} dimension="100%" handlePress={() => router.push("/Settings")}>
</ScreenHeaderBtn> */}
  <Text style={{color:"white", alignSelf: 'center', fontSize: 22, paddingLeft: 10}}>Customization</Text>

  </View>
  )
},
headerTitle: ""
}}
name="Customization"
/>

</Stack>);
}

export default Layout;