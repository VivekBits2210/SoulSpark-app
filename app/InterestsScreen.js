import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SButton from "../components/SButton";
import { useEffect } from "react";
import { encrypEmail } from "../constants";

const interests = [
  "photography",
  "shopping",
  "traveling",
  "cooking",
  "reading",
  "gaming",
  "fitness",
  "music",
  "art",
  "sports",
];

const InterestsScreen = ({ navigation }) => {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);
  // const [validInterests, setValidInterests] = useState(false);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Select your interests</Text>
        <View style={styles.chipContainer}>
          {interests.map((interest, index) => (
            <Chip
              key={index}
              mode="outlined"
              selected={selectedInterests.includes(interest)}
              onPress={() => {
                toggleInterest(interest);
                // console.log("length: " + selectedInterests.length);
              }}
              style={styles.chip}
            >
              {interest}
            </Chip>
          ))}
        </View>
        <View margin={50}>
          <SButton
            onPress={() => {
              if (selectedInterests.length === 0) {
                // console.log("no interests selected");
                return;
              }
              fetch(`https://api-soulspark.com/user-profiles/post-attribute`, {
                method: "POST",
                body: JSON.stringify({
                  email: encrypEmail,
                  interests: selectedInterests.join(","),
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((json) => console.log(json));
              router.replace("MyTabs");
              // console.log(selectedInterests);
            }}
            disabled={!selectedInterests.length}
          >
            {selectedInterests.length
              ? "Continue"
              : "Select at least one interest"}
          </SButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chip: {
    margin: 4,
  },
  continueButton: {
    marginTop: 32,
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
    color: "#fff",
  },
});

export default InterestsScreen;
