import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SButton from "../components/SButton";

const interests = [
  "Photography",
  "Shopping",
  "Traveling",
  "Cooking",
  "Reading",
  "Gaming",
  "Fitness",
  "Music",
  "Art",
  "Sports",
];

const InterestsScreen = ({ navigation }) => {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#E4E4E4" }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Select your interests</Text>
        <View style={styles.chipContainer}>
          {interests.map((interest, index) => (
            <Chip
              key={index}
              mode="outlined"
              selected={selectedInterests.includes(interest)}
              onPress={() => toggleInterest(interest)}
              style={styles.chip}
            >
              {interest}
            </Chip>
          ))}
        </View>
        <View margin={50}>
          <SButton
            onPress={() => {
              router.push("MyTabs");
              console.log(selectedInterests);
            }}
            style={styles.loginButton}
          >
            Continue
          </SButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default InterestsScreen;
