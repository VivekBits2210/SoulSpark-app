import React from "react";
import { View, Text } from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { Pressable, StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import { useState, useEffect } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { api_url, user } from "../constants";

const ages = [];
for (let i = 18; i <= 60; i++) {
  ages[i] = "" + i;
}

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

const Profile = () => {
  const [gender, setGender] = useState("Male");
  const [genderFocus, setGenderFocus] = useState("Female");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  function loadUserInfo() {
    fetch(
      `${api_url}/user-profiles/fetch-user-info?email=${user.encryption}`
    )
      .then((res) => res.json())
      .then((json) => {
        setUserProfile(json);
        console.log(json);
      });
  }
  useEffect(loadUserInfo, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingVertical: 40,
        gap: 20,
      }}
    >
      <CustomInput customName="Name" />
      <Controller
        control={control}
        name="age"
        render={({ field: { onChange, value } }) => (
          <View style={styles.textBox}>
            <Text style={styles.label}>Select an age</Text>
            <Picker selectedValue={value} onValueChange={onChange}>
              {ages.map((item, key) => (
                <Picker.Item key={key} label={item} value={item} />
              ))}
            </Picker>
          </View>
        )}
        rules={{
          required: {
            value: true,
            message: "Please fill your Age",
          },
        }}
      />
      <CustomRadioInput
        values={["Male", "Female"]}
        element={<Pressable style={styles.radioSelect} />}
        onPress={(value) => {
          setGender(value);
        }}
        currValue={gender}
        count={2}
        customName="Select your gender"
      />
      <CustomRadioInput
        values={["Male", "Female", "Any"]}
        element={<Pressable style={styles.radioSelect} />}
        onPress={(value) => {
          setGenderFocus(value);
        }}
        currValue={genderFocus}
        count={3}
        customName="Select your preference"
      />
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
          >
            {interest}
          </Chip>
        ))}
      </View>
      {/* <SearchableDropdown
        onItemSelect={(item) => {
          setSelectedCountry(item);
        }}
        containerStyle={{ padding: 5 }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "#f5f5f5",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: "#222" }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={countries}
        defaultIndex={selectedCountry.id - 1}
        resetValue={false}
        textInputProps={{
          placeholder: "placeholder",
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
          },
          onTextChange: (text) => console.log(text),
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      /> */}
    </ScrollView>
  );
};

const CustomInput = (props) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        backgroundColor: "#f5f5f5",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: "#999",
        }}
      >
        {props.customName}
      </Text>
      <TextInput
        style={{
          fontSize: 20,
        }}
      ></TextInput>
    </View>
  );
};

const CustomRadioInput = (props) => {
  let arr = [];
  for (let i = 0; i < props.count; i++) {
    arr.push(
      React.cloneElement(props.element, {
        style:
          props.currValue === props.values[i]
            ? styles.selected
            : styles.radioSelect,
        onPress: () => {
          props.onPress(props.values[i]);
        },
        children: (
          <Text
            style={
              props.currValue === props.values[i] ? styles.selectedText : {}
            }
          >
            {props.values[i]}
          </Text>
        ),
      })
    );
  }
  return (
    <View style={{ ...styles.textBox, paddingHorizontal: 20, gap: 20 }}>
      <Text
        style={{
          color: "#999",
        }}
      >
        {props.customName}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {arr}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "black",
  },
  selectedText: {
    color: "white",
  },
  radioSelect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "white",
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
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  container: {
    width: "100%",
    marginBottom: 20,
  },
  textBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    borderColor: "#e4e4e4",
    borderWidth: 1,
    alignSelf: "stretch",
    marginVertical: 7,
  },
  label: {
    color: "#999",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 5,
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    marginRight: 10,
  },
  radioButtonActive: {
    backgroundColor: "black",
    borderWidth: 0,
  },
  radioButtonLabel: {
    fontSize: 15,
    color: "#333",
  },
  radioButtonLabelSelected: {
    fontWeight: "bold",
  },
  radioButtonSelected: {
    backgroundColor: "#F5F5F5",
  },
  button: {
    width: "100%",
    backgroundColor: "#517CFF",
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
});

export default Profile;
