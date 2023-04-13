import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useSearchParams, useNavigation } from "expo-router";
import SButton from "../components/SButton";
import { api_url } from "../constants";

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

const InterestsScreen = () => {
  const { encryption, picture } = useSearchParams();
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);

  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.addListener('beforeRemove', (e) => {
  //       if(e.data.action.type==="GO_BACK"){
  //         e.preventDefault();
  //         console.log('Back button disabled on Interests Screen');
  //       }
  //       else{
  //         navigation.dispatch(e.data.action)
  //       }
  //   });
  // });

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
              }}
              style={[
                styles.chip,
                selectedInterests.includes(interest)
                  ? styles.chipSelected
                  : styles.chipUnselected,
              ]}
              textStyle={
                selectedInterests.includes(interest)
                  ? styles.chipTextSelected
                  : styles.chipTextUnselected
              }
              selectedColor="white"
            >
              {interest}
            </Chip>
          ))}
        </View>
        <View margin={50}>
          <SButton
            onPress={() => {
              if (selectedInterests.length === 0) {
                return;
              }
              fetch(`${api_url}/user-profiles/post-attribute`, {
                method: "POST",
                body: JSON.stringify({
                  email: encryption,
                  interests: selectedInterests.join(","),
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((res) => res.json());
              console.log("here")
              router.push(
                `MyTabs?encryption=${encryption}&picture=${picture}`
              );
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
  chipSelected: {
    backgroundColor: "black",
    borderColor: "white",
  },
  chipUnselected: {
    backgroundColor: "white",
    borderColor: "black",
  },
  chipTextSelected: {
    color: "white",
  },
  chipTextUnselected: {
    color: "black",
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
