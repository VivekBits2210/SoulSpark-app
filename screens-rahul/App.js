import InterestsScreen from "./screens/InterestsScreen";
import FormScreen from "./screens/FormScreen";
import WelcomeCarouselScreen from "./screens/WelcomeCarouselScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeCarouselScreen"
          component={WelcomeCarouselScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormScreen"
          component={FormScreen}
        />
        <Stack.Screen
          name="InterestsScreen"
          component={InterestsScreen}
          options={{ title: "Welcome" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
