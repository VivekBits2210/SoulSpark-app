import React from "react";
import { View, Text } from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { Pressable, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Chip } from "react-native-paper";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { api_url, user, normalize_font } from "../constants";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";

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
  const router = useRouter();
  const [gender, setGender] = useState("Male");
  const [genderFocus, setGenderFocus] = useState("Female");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  function loadUserInfo() {
    fetch(
      `${api_url}/user-profiles/fetch-user-info?email=${user.encryption}`
    )
      .then((res) => res.json())
      .then((json) => {
        const { name, age, gender, gender_focus, interests } = json;
        setUserProfile(json);
        setName(name);
        setAge(String(age));
        setGender(gender);
        setGenderFocus(gender_focus);
        setSelectedInterests(interests.split(","));
        // console.log(json);
        setIsLoading(false);
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
    <>
    <SafeAreaView style={styles.safeArea}>
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
            <ScrollView contentContainerStyle={styles.scrollView}
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
          <CustomInput customName="Name" value={name} onChangeText={setName} />
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <Text style={styles.label}>Select an age</Text>
                <Picker selectedValue={age} onValueChange={setAge}>
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
          values={["M","F"]}
          labels={["Male", "Female"]}
          element={<Pressable style={styles.radioSelect} />}
          onPress={(value) => {
            setGender(value);
          }}
          currValue={gender}
          count={2}
          customName="Select your gender"
        />
        <CustomRadioInput
          values={["M","F","E"]}
          labels={["Male", "Female", "Any"]}
          element={<Pressable style={styles.radioSelect} />}
          onPress={(value) => {
            setGenderFocus(value);
          }}
          currValue={genderFocus}
          count={3}
          customName="Select your preference"
        />
        <View style={styles.textBox}>
          <Text style={styles.label}>Select your interests</Text>
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
        </View>

      <View style={{
        display:"flex", 
        paddingVertical:"5%", 
        alignContent: "center", 
        alignItems: "center",
        marginBottom: 40,}}>
      <TouchableOpacity
        style={{
          flex: 1,
          alignContent: "center",
          alignItems: "center",
          borderRadius: 4,
          backgroundColor: "black",
          width: "17%",
          paddingVertical: 5, 
        }}
        onPress={() => {
          formValue = {
            "name": name,
            "age": age,
            "gender": gender,
            "gender_focus": genderFocus,
            "interests": selectedInterests.join(","),
          }
          formValue.email = user.encryption;
          fetch(`${api_url}/user-profiles/post-attribute`, {
            method: "POST",
            body: JSON.stringify(formValue),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((json) => console.log(json));
          router.back();
        }}
      >
        <Text style={{ color: "white", fontSize: normalize_font(14), fontFamily: "Roboto" }}>SAVE</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
      )}
    </SafeAreaView>
    <Toast />
    </>
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
        value={props.value}
        onChangeText={props.onChangeText}
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
            key={props.values[i]}
          >
            {props.labels[i]}
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
    borderRadius: 10,
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
    borderRadius: 10,
    backgroundColor: "white",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    borderColor: "#e4e4e4",
    borderWidth: 1,
    alignSelf: "stretch",
    marginVertical: 7,
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
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default Profile;
