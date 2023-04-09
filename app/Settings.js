import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
  RefreshControl,
  Switch,
  Touchable,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {
  SettingsScreen,
  SettingsData,
  Chevron,
} from "react-native-settings-screen";
import { useState } from "react";
import Modal from "react-native-modal";
import { Pressable } from "react-native";

const fontFamily = Platform.OS === "ios" ? "Avenir" : "sans-serif";

const renderHero = () => (
  <View style={styles.heroContainer}>
    <Image source={require("../assets/profile.jpg")} style={styles.heroImage} />
    <View style={{ flex: 1 }}>
      <Text style={styles.heroTitle}>Vivek Nayak</Text>
      <Text style={styles.heroSubtitle}>viveknayak2210@gmail.com</Text>
    </View>
    <Chevron />
  </View>
);

export default function Settings() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  state = {
    refreshing: false,
  };

  settingsData = [
    { type: "CUSTOM_VIEW", key: "hero", render: renderHero },
    {
      type: "SECTION",
      header: "My Section".toUpperCase(),
      rows: [
        {
          title: "Contact Support",
          showDisclosureIndicator: true,
          onPress: () => {
            console.log("Contact Support");
            setShowContactModal(true);
          },
        },
        {
          title: "FAQ",
          showDisclosureIndicator: true,
          onPress: () => {
            console.log("FAQ");
            setShowFAQModal(true);
          },
        },
        {
          title: "Learn mode about AI",
          showDisclosureIndicator: true,
          onPress: () => {
            console.log("Learn mode about AI");
            setShowLearnModal(true);
          },
        },
      ],
    },
    {
      type: "SECTION",
      header: "Legal".toUpperCase(),
      rows: [
        {
          title: "Terms of Service",
        },
        {
          title: "Privacy Policy",
        },
      ],
    },
    {
      type: "SECTION",
      header: "Other".toUpperCase(),
      rows: [
        {
          title: "Desktop Version",
          showDisclosureIndicator: true,
        },
        {
          title: "Delete chat history",
          onPress: () => {
            console.log("Delete chat history");
            setShowDeleteChatModal(true);
          },
        },
        {
          title: "Delete account",
          onPress: () => {
            console.log("Delete account");
            setShowDeleteAccountModal(true);
          },
        },
        {
          title: "Log out",
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
            fontFamily,
          }}
        >
          v1.2.3
        </Text>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      {/* <View style={styles.navBar}> */}
      {/* <Text style={styles.navBarTitle}>Settings</Text> */}
      {/* </View> */}
      <Modal
        animationOut="fadeOutUp"
        backgroundOpacity="0.7"
        transparent={true}
        isVisible={showDeleteAccountModal}
        onRequestClose={() => {
          setShowDeleteAccountModal(!showDeleteAccountModal);
        }}
      >
        <View style={styles.modalView}>
          <Text>Are you sure you want to delete your account ?</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 30,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Delete
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "black",
                padding: 10,
                borderRadius: 20,
              }}
              onPress={() => setShowDeleteAccountModal(!showDeleteAccountModal)}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationOut="fadeOutUp"
        backgroundOpacity="0.7"
        transparent={true}
        isVisible={showFAQModal}
        onRequestClose={() => {
          setShowFAQModal(!showFAQModal);
        }}
      >
        <View style={styles.modalView}>
          <Text>FAQ</Text>
          <Pressable
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 50,
            }}
            onPress={() => setShowFAQModal(!showFAQModal)}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              OK
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        animationOut="fadeOutUp"
        backgroundOpacity="0.7"
        transparent={true}
        isVisible={showLearnModal}
        onRequestClose={() => {
          setShowLearnModal(!showLearnModal);
        }}
      >
        <View style={styles.modalView}>
          <Text>Learn more</Text>
          <Pressable
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 50,
            }}
            onPress={() => setShowLearnModal(!showLearnModal)}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              OK
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        animationOut="fadeOutUp"
        backgroundOpacity="0.7"
        transparent={true}
        isVisible={showDeleteChatModal}
        onRequestClose={() => {
          setShowDeleteChatModal(!showDeleteChatModal);
        }}
      >
        <View style={styles.modalView}>
          <Text>Are you sure you want to delete your Chats ?</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 30,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Delete
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "black",
                padding: 10,
                borderRadius: 20,
              }}
              onPress={() => setShowDeleteChatModal(!showDeleteChatModal)}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationOut="fadeOutUp"
        backgroundOpacity="0.7"
        transparent={true}
        isVisible={showContactModal}
        onRequestClose={() => {
          setShowContactModal(!showContactModal);
        }}
      >
        <View style={styles.modalView}>
          <Text>Contact us at</Text>
          <Pressable
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 50,
            }}
            onPress={() => setShowContactModal(!showContactModal)}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              OK
            </Text>
          </Pressable>
        </View>
      </Modal>
      <SettingsScreen
        data={this.settingsData}
        globalTextStyle={{ fontFamily }}
        // scrollViewProps={{
        //   refreshControl: (
        //     <RefreshControl
        //       refreshing={this.state.refreshing}
        //       onRefresh={() => {
        //         this.setState({ refreshing: true })
        //         setTimeout(() => this.setState({ refreshing: false }), 3000)
        //       }}
        //     />
        //   ),
        // }}
      />
    </View>
  );
}

const statusBarHeight = Platform.OS === "ios" ? 35 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    backgroundColor: "black",
    height: 44 + statusBarHeight,
    alignSelf: "stretch",
    paddingTop: statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  navBarTitle: {
    color: "white",
    fontFamily,
    fontSize: 17,
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
    fontFamily,
    color: "black",
    fontSize: 24,
  },
  heroSubtitle: {
    fontFamily,
    color: "#999",
    fontSize: 14,
  },
  modalView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 25,
    gap: 20,
  },
});
