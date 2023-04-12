import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { user, api_url } from "../constants";

const UnmatchMenu = (props) => {
  const router = useRouter();
  // const [menuVisible, setMenuVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [unmatchedVisible, setUnmatchedVisible] = useState(false);
  const { id } = props;

  const showConfirmation = () => {
    // setMenuVisible(false);
    setConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setConfirmationVisible(false);
  };

  const handleUnmatch = () => {
    let data = new FormData();
    data.append("email", user.encryption);
    data.append("bot_id", id);
    console.log("Form data", data, typeof data)
    fetch(`${api_url}/chat-module/unmatch`, {
      method: "POST",
      body: data,
      redirect: "follow",
    }).then((res) => {
      setConfirmationVisible(false);
      setUnmatchedVisible(true);
      router.back();
    });
  };

  const hideUnmatched = () => {
    setUnmatchedVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={showConfirmation} style={styles.kebabButton}>
        <Ionicons name={"close-circle-outline"} color={"red"} size={25} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmationVisible}
        onRequestClose={hideConfirmation}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={hideConfirmation}
          activeOpacity={1}
        >
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>Unmatch?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleUnmatch}>
                <Text style={styles.buttonTextClose}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={hideConfirmation}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={unmatchedVisible}
        onRequestClose={hideUnmatched}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={hideUnmatched}
          activeOpacity={1}
        >
          <View style={styles.unmatchedContainer}>
            <Text style={styles.unmatchedText}>Unmatched!</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  kebabButton: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: 48,
    height: 48,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  confirmationContainer: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "black",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  buttonTextClose: {
    fontSize: 14,
    color: "red",
  },
  unmatchedContainer: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  unmatchedText: {
    fontSize: 18,
    color: "red",
  },
});

export default UnmatchMenu;
