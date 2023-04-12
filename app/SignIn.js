import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as Linking from 'expo-linking';
import { makeRedirectUri } from 'expo-auth-session';

const redirectUri = makeRedirectUri({
  native: 'com.soulspark.testpublishapp:/oauth2redirect',
  useProxy: true,
});

export default function SignIn() {
  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState();
  const [requireRefresh, setRequireRefresh] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "123407580501-bnpepikal9j1k7178c7v29au38ne7bsu.apps.googleusercontent.com",
    iosClientId:
      "123407580501-3m0u09eqspq7sk4oem79ssdjh736j7jp.apps.googleusercontent.com",
    expoClientId:
      "123407580501-s1iti9qokaqkeavio2ifptef48qiedo4.apps.googleusercontent.com",
    redirectUri: redirectUri,
  });

  useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      setAuth(response.authentication);

      const persistAuth = async () => {
        await AsyncStorage.setItem(
          "auth",
          JSON.stringify(response.authentication)
        );
      };
      persistAuth();

      // Wait for the getUserData function to complete
      getUserData().then((userInfo) => {
        // Create User on the backend
        fetch(
          "http://ec2-100-25-31-90.compute-1.amazonaws.com:8000/user-profiles/create-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userInfo.email,
              name: userInfo.name,
            }),
          }
        )
          .then((response) => console.log("apiresponse" ,response.json()))
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      });
    }
  }, [response]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("auth");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        setAuth(authFromJson);
        console.log(authFromJson);

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

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      console.log(data);
      setUserInfo(data);
    });
  };

  const showUserData = () => {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
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

  const refreshToken = async () => {
    const clientId = getClientId();
    console.log(auth);
    const tokenResult = await AuthSession.refreshAsync(
      {
        clientId: clientId,
        refreshToken: auth.refreshToken,
      },
      {
        tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
      }
    );

    tokenResult.refreshToken = auth.refreshToken;

    setAuth(tokenResult);
    await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
    setRequireRefresh(false);
  };

  if (requireRefresh) {
    return (
      <View style={styles.container}>
        <Text>Token requires refresh...</Text>
        <Button title="Refresh Token" onPress={refreshToken} />
      </View>
    );
  }

  const logout = async () => {
    await AuthSession.revokeAsync(
      {
        token: auth.accessToken,
      },
      {
        revocationEndpoint: "https://oauth2.googleapis.com/revoke",
      }
    );

    setAuth(undefined);
    setUserInfo(undefined);
    await AsyncStorage.removeItem("auth");
  };

  return (
    <View style={styles.container}>
      {showUserData()}
      <Button
        title={auth ? "Get User Data" : "Login"}
        onPress={
          auth
            ? getUserData
            : () => promptAsync({ useProxy: true, showInRecents: true })
        }
      />
      {auth ? <Button title="Logout" onPress={logout} /> : undefined}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
