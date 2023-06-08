import React from "react";
import { ImageBackground } from "react-native";
import { Pressable } from "react-native";
import { View, Text } from "react-native";
import { Input } from "react-native-elements";

function Register() {
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/registerPageBG.jpg")}
      style={{
        alignItems: "center",
        width: "100%",
        height: "100%",
        // padding: 20,
      }}
    >
      <View
        style={{
          width: "100%",

          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#333",
            marginBottom: 20,
          }}
        >
          Register
        </Text>
        <LabledInput label="Name" />
        <LabledInput label="Email" />
        <LabledInput label="Password" type="password" />
        <Pressable
          style={{
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Register
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

function LabledInput(props) {
  return (
    <View
      style={{
        width: "100%",
        marginBottom: 10,
        padding: 0,
      }}
    >
      <Input
        secureTextEntry={props.type === "password"}
        placeholder={props.label}
        style={{
          width: "100%",
          marginBottom: 10,
          padding: 0,
        }}
      ></Input>
    </View>
  );
}

export default Register;
