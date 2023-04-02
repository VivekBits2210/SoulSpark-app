import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Chip, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const interests = [
  'Photography',
  'Shopping',
  'Traveling',
  'Cooking',
  'Reading',
  'Gaming',
  'Fitness',
  'Music',
  'Art',
  'Sports',
];

const InterestsScreen = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { colors } = useTheme();

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
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
        <Button
          mode="contained"
          onPress={() => navigation.navigate('NextScreen')}
          disabled={!selectedInterests.length}
          style={styles.continueButton}
        >
          Continue
        </Button>
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
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    margin: 4,
  },
  continueButton: {
    marginTop: 32,
  },
});

export default InterestsScreen;
