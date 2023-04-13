import * as React from "react";
import { StyleSheet, Text, View, Image, Switch } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { SettingsScreen } from "react-native-settings-screen";
import { useSearchParams } from "expo-router";
import { url_refresh_hack, aws_url } from "../constants";

function renderHero(name, src) {
  return (
    <View style={styles.heroContainer}>
      <Image source={{ uri: src }} style={styles.heroImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.heroTitle}>{name}</Text>
      </View>
    </View>
  );
}

export default function Customization() {
  const { name, id, encryption } = useSearchParams();
  const src = `${aws_url}/${id}.jpg?url_refresh_hack=${url_refresh_hack}`;
  state = {
    refreshing: false,
  };

  settingsData = [
    { type: "CUSTOM_VIEW", key: "hero", render: () => renderHero(name, src) },
    {
      type: "SECTION",
      header: "My Section".toUpperCase(),
      footer:
        "Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
      rows: [
        {
          title: "A row",
          showDisclosureIndicator: true,
        },
        { title: "A non-tappable row" },
        {
          title: "This row has a",
          subtitle: "Subtitle",
          showDisclosureIndicator: true,
        },
        {
          title: "Long title. So long long long long long long long",
          subtitle:
            "And so is the subtitle. Even longer longer longer longer longer",
        },
        {
          title: "Switch",
          renderAccessory: () => <Switch value onValueChange={() => {}} />,
        },
        {
          title: "Text",
          renderAccessory: () => (
            <Text style={{ color: "#999", marginRight: 6, fontSize: 18 }}>
              Maybe
            </Text>
          ),
        },
        {
          title: "Custom view",
          renderAccessory: () => (
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: "blue",
              }}
            />
          ),
          showDisclosureIndicator: true,
        },
      ],
    },
    {
      type: "SECTION",
      header: "My Other Section".toUpperCase(),
      rows: [
        {
          title: "Dolor Nullam",
          showDisclosureIndicator: true,
        },
        {
          title: "Nulla vitae elit libero",
          renderAccessory: () => (
            <Text style={{ color: "#999", marginRight: 6, fontSize: 18 }}>
              Dapibus
            </Text>
          ),
        },
        {
          title: "Ipsum Lorem Venenatis",
          subtitle: "Vestibulum Inceptos Fusce Justo",
          renderAccessory: () => (
            <Text style={{ color: "#999", marginRight: 6, fontSize: 18 }}>
              Yes
            </Text>
          ),
          showDisclosureIndicator: true,
        },
        {
          title: "Cras Euismod",
          renderAccessory: () => (
            <Icon
              style={{ marginTop: 3, marginRight: 6 }}
              name="colours"
              size={32}
              color="black"
            />
          ),
          showDisclosureIndicator: true,
        },
      ],
    },
    {
      type: "SECTION",
      header: "My Third Section".toUpperCase(),
      rows: [
        {
          title: "Different title style",
          showDisclosureIndicator: true,
          titleStyle: {
            color: "red",
          },
        },
      ],
    },
    {
      type: "CUSTOM_VIEW",
      render: () => (
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            color: "#999",
            marginBottom: 40,
            marginTop: -30,
            fontFamily: "Roboto",
          }}
        >
          v1.2.3
        </Text>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <SettingsScreen
        data={this.settingsData}
        globalTextStyle={{ fontFamily: "Roboto" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroContainer: {
    marginTop: 40,
    marginBottom: 50,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    flexDirection: "row",
  },
  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "black",
    marginHorizontal: 20,
  },
  heroTitle: {
    fontFamily: "Roboto",
    color: "black",
    fontSize: 24,
  },
  heroSubtitle: {
    fontFamily: "Roboto",
    color: "#999",
    fontSize: 14,
  },
});
