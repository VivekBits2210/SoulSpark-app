import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "react-native-elements";
import SButton from "../components/SButton";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Stack, useRouter } from "expo-router";

const listData = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
  { label: "Any", value: "A" },
];

const ages = [""];
for (let i = 18; i <= 150; i++) {
  ages[i] = "" + i;
}

const FormScreen = ({ navigation }) => {
  const router = useRouter();
  // const [age, setAge] = useState(undefined);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
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
                message: "Please fill out the Age",
              },
            }}
          />

          {errors["age"]?.message ? (
            <Text style={styles.errorText}>{errors["age"]?.message}</Text>
          ) : null}

          <Controller
            control={control}
            name="yourGender"
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <Text style={styles.label}>Your Gender</Text>

                {listData.map((item) => (
                  <CheckBox
                    key={item.value}
                    containerStyle={styles.radioButtonRow}
                    textStyle={styles.radioButtonLabel}
                    title={item.label}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={value === item.value}
                    onPress={() => onChange(item.value)}
                  />
                ))}
              </View>
            )}
            rules={{
              required: {
                value: true,
                message: "Please fill out gender",
              },
            }}
          />

          {errors.yourGender && (
            <Text style={styles.errorText}>{errors.yourGender.message}</Text>
          )}

          <Controller
            control={control}
            name="preferredGender"
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <Text style={styles.label}>Looking For</Text>

                {listData.map((item) => (
                  <CheckBox
                    key={item.value}
                    containerStyle={styles.radioButtonRow}
                    textStyle={styles.radioButtonLabel}
                    title={item.label}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={value === item.value}
                    onPress={() => onChange(item.value)}
                  />
                ))}
              </View>
            )}
            rules={{
              required: {
                value: true,
                message: "Please fill out what you're looking for",
              },
            }}
          />

          {errors.preferredGender && (
            <Text style={styles.errorText}>
              {errors.preferredGender.message}
            </Text>
          )}
        </View>

        <View style={styles.container}>
          <SButton
            onPress={handleSubmit((formValue) => {
              console.log("Form Value", JSON.stringify(formValue));
              router.push("InterestsScreen");
            })}
            style={styles.loginButton}
          >
            Submit
          </SButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  container: {
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
  },
  textBox: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    paddingStart: 5,
    borderColor: "#e4e4e4",
    borderWidth: 1,
    alignSelf: "stretch",
    marginVertical: 7,
  },
  ageBox: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    paddingStart: 5,
    borderColor: "#e4e4e4",
    borderWidth: 1,
    alignSelf: "stretch",
    marginVertical: 7,
  },
  text: {
    fontSize: 15,
    paddingVertical: 10,
    color: "#333", // Updated color
  },
  errorText: {
    color: "red",
  },
  button: {
    width: "100%",
    backgroundColor: "#517CFF",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
  },
  label: {
    paddingTop: 10,
    fontSize: 15,
    marginBottom: 5,
    color: "#333", // Updated color
  },
  radioGroup: {
    marginBottom: 15,
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "rgba(158, 150, 150, 0)",
  },
  radioButtonLabel: {
    fontSize: 15,
    marginLeft: 5,
    color: "#333",
  },
  genderContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderColor: "#e4e4e4",
    borderWidth: 1,
  },
});

export default FormScreen;
