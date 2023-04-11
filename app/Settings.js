import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Switch, Linking, Dimensions, ScrollView, FlatList,
  Keyboard,} from "react-native";
import { SettingsScreen, Chevron } from "react-native-settings-screen";
import { useState, useRef, useEffect } from "react";
import Modal from "react-native-modal";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { user, api_url, version } from "../constants";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native-paper";

export default function Settings() {
  const router = useRouter();
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [isSoundsEnabled, setIsSoundsEnabled] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const [hasError, setHasError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);  

  const handleTextChange = (text) => {
    setInputText(text);
    if (text.length >= 250 || text.length < 10) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const makePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const flatListRef = useRef(null);

  const renderItem = () => (
    <TextInput
      style={[styles.textInput, { minHeight: 80 }]}
      onChangeText={handleTextChange}
      value={inputText}
      maxLength={250}
      multiline
    />
  );

  state = {
    refreshing: false,
  };

  function loadUserInfo() {
    fetch(
      `${api_url}/user-profiles/fetch-user-info?email=${user.encryption}`
    )
      .then((res) => res.json())
      .then((json) => {
        setIsMusicEnabled(json.music_enabled)
        setIsSoundsEnabled(json.sounds_enabled)
        console.log(json);
        setIsLoading(false);
      });
  }
  useEffect(loadUserInfo, []);

  const toggleMusicSwitch = () =>  {
    setIsMusicEnabled((previousState) => !previousState);
  }
  
  const toggleSoundsSwitch = () => {
        setIsSoundsEnabled((previousState) => !previousState);
  }

  settingsData = [
    {
      type: "CUSTOM_VIEW",
      key: "hero",
      render: () => (
        <Pressable
          style={styles.heroContainer}
          onPress={() => {
            router.push("Profile");
          }}
        >
          <Image
            source={require("../assets/profile.jpg")}
            style={styles.heroImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>{user.name}</Text>
            <Text style={styles.heroSubtitle}>{user.email}</Text>
          </View>
          <Chevron />
        </Pressable>
      ),
    },
    {
      type: "SECTION",
      rows: [
        {
          title: "Background Music",
          renderAccessory: () => (
            <Switch onValueChange={toggleMusicSwitch} value={isMusicEnabled} />
          ),
        },
        {
          title: "Sounds",
          renderAccessory: () => (
            <Switch
              onValueChange={toggleSoundsSwitch}
              value={isSoundsEnabled}
            />
          ),
        },
      ],
    },
    {
      type: "SECTION",
      header: "Help".toUpperCase(),
      rows: [
        {
          title: "I'm in Crisis!",
          showDisclosureIndicator: true,
          titleStyle: {
            color: "red",
          },
          onPress: () => {
            setShowCrisisModal(true);
          },
        },
        {
          title: "Contact Support",
          showDisclosureIndicator: true,
          onPress: () => {
            setShowContactModal(true);
          },
        },
        {
          title: "Rate Us",
          onPress: () => {
            Linking.openURL("https://www.google.com");
          },
          showDisclosureIndicator: true,
        },
        {
          title: "FAQ",
          showDisclosureIndicator: true,
          onPress: () => {
            Linking.openURL("https://www.google.com");
          },
        },
        {
          title: "Learn More about AI",
          showDisclosureIndicator: true,
          onPress: () => {
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
          onPress: () => {
            Linking.openURL("https://www.google.com");
          },
        },
        {
          title: "Privacy Policy",
          onPress: () => {
            Linking.openURL("https://www.google.com");
          },
        },
      ],
    },
    {
      type: "SECTION",
      header: "Other".toUpperCase(),
      rows: [
        {
          title: "Delete chat history",
          onPress: () => {
            setShowDeleteChatModal(true);
          },
        },
        {
          title: "Delete account",
          onPress: () => {
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
            fontFamily: "Roboto",
          }}
        >
          {version}
        </Text>
      ),
    },
  ];

  return (
    <>
    {isLoading ? ( 
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
        <ActivityIndicator size="large" color="#000" />
      </View>
      ) : (
      <View style={styles.container}>
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
            <Text>Are you sure you want to delete your account?</Text>
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
                onPress={() =>
                  setShowDeleteAccountModal(!showDeleteAccountModal)
                }
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
                onPress={() =>
                  setShowDeleteAccountModal(!showDeleteAccountModal)
                }
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
          isVisible={showCrisisModal}
          onRequestClose={() => {
            setShowCrisisModal(!showCrisisModal);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.heading}>If you're in crisis</Text>
            <Text style={styles.description}>If you're in the US, please call the National Suicide Prevention Lifeline (toll-free)</Text>
            <Pressable
              style={{
                backgroundColor: "black",
                padding: 10,
                marginBottom: 10,
                // borderRadius: 20,
              }}
              onPress={() => makePhoneCall('1-800-273-TALK')}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                1-800-273-TALK
              </Text>
            </Pressable>
            <Text style={styles.description}>If you're elsewhere, please call a local hotline</Text>
            <Pressable
              style={{
                backgroundColor: "black",
                padding: 10,
                marginBottom: 40,
                // borderRadius: 20,
              }}
              onPress={() => Linking.openURL("https://www.google.com")}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Find a hotline in your country
              </Text>
            </Pressable>
            <View 
              style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
              }}
              >
              <View></View>
              <Pressable
                style={{
                  backgroundColor: "black",
                  padding: 10,
                  // borderRadius: 20,
                }}
                onPress={() => setShowCrisisModal(!showCrisisModal)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              </View>
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
            <Text>Are you sure you want to delete all your chat history?</Text>
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
                onPress={() => {
                  setShowDeleteChatModal(!showDeleteChatModal);
                  fetch(`${api_url}/chat-module/delete-all-chat-history`, {
                    method: "POST",
                    body: JSON.stringify({ email: user.encryption }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((res) => res.json())
                    .then((json) => {
                      Toast.show({
                        type: "success",
                        text1: "Chat History Deleted",
                        text2: "All chat history has been wiped!",
                      });
                    });
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
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Text style={{ fontWeight: 'bold' }}>Please send us your query here!</Text>
              <View style={styles.textInputContainer}>
                <FlatList
                  ref={flatListRef}
                  data={[{ key: 'textInput' }]}
                  renderItem={renderItem}
                  onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
                  onScrollBeginDrag={Keyboard.dismiss}
                  keyboardShouldPersistTaps="handled"
                />
              </View>
              {hasError && (
                <Text style={styles.errorMessage}>
                  {inputText.length >= 250
                    ? "Please limit your input to 250 characters."
                    : "Please enter at least 10 characters."}
                </Text>
              )}
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowContactModal(!showContactModal); 
                    setInputText('');
                  }
                }
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.submitButton, hasError ? styles.disabledSubmitButton : {}]}
                  onPress={() => {
                    setShowContactModal(!showContactModal);
                    setInputText('');
                    }
                  }
                  disabled={hasError}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <SettingsScreen
          data={this.settingsData}
          globalTextStyle={{ fontFamily: "Roboto" }}
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
      )}
      <Toast />
    </>
  );
}

const { width } = Dimensions.get('window');
const paddingHorizontalMargin = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: paddingHorizontalMargin,
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
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: width - 2 * paddingHorizontalMargin,
  },
  textInputContainer: {
    width: '100%',
    maxHeight: 80,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginVertical: 10,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'black',
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'black',
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  disabledSubmitButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'white',
  },
  cancelButtonText: {
    color: 'red',
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  description: {
    textAlign: "center",
    marginBottom: 15,
  },
});
