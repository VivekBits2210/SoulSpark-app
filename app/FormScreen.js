import React from "react";
import { Picker } from "@react-native-picker/picker";
import SButton from "../components/SButton";
import { useEffect } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useNavigation, useSearchParams } from "expo-router";
import { api_url } from "../constants";

const CustomRadioButton = ({ label, value, selectedValue, onValueChange }) => {
  const isSelected = value === selectedValue;

  return (
    <TouchableOpacity
      style={[styles.radioButtonRow, isSelected && styles.radioButtonSelected]}
      onPress={() => onValueChange(value)}
    >
      <View
        style={[styles.radioButton, isSelected && styles.radioButtonActive]}
      />
      <Text
        style={[
          styles.radioButtonLabel,
          isSelected && styles.radioButtonLabelSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const listDataGenderFocus = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
  { label: "Any", value: "E" },
];

const listData = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
];

const ages = [];
for (let i = 18; i < 60; i++) {
  ages[i] = "" + i;
}

const FormScreen = () => {
  const { encryption, picture } = useSearchParams();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();

  useEffect(() => {
    console.log("Navigate Action in form screen maybe");
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "GO_BACK") {
        e.preventDefault();
        console.log("Back button disabled on Form Screen");
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Profile Information</Text>
        <View style={styles.container}>
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <Text style={styles.label}>Select an age</Text>
                <Picker selectedValue={value} onValueChange={onChange}>
                  <Picker.Item key={"null_item"} label="" value={null} />
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

          {errors["age"]?.message ? (
            <Text style={styles.errorText}>{errors["age"]?.message}</Text>
          ) : null}

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <Text style={styles.label}>Your Gender</Text>

                {listData.map((item) => (
                  <CustomRadioButton
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    selectedValue={value}
                    onValueChange={onChange}
                  />
                ))}
              </View>
            )}
            rules={{
              required: {
                value: true,
                message: "Please fill your Gender",
              },
            }}
          />
          {errors["gender"]?.message ? (
            <Text style={styles.errorText}>{errors["gender"]?.message}</Text>
          ) : null}

          <Controller
            control={control}
            name="gender_focus"
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <Text style={styles.label}>Looking For</Text>

                {listDataGenderFocus.map((item) => (
                  <CustomRadioButton
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    selectedValue={value}
                    onValueChange={onChange}
                  />
                ))}
              </View>
            )}
            rules={{
              required: {
                value: true,
                message: "Please fill your Preference",
              },
            }}
          />

          {errors["gender_focus"]?.message ? (
            <Text style={styles.errorText}>
              {errors["gender_focus"]?.message}
            </Text>
          ) : null}
        </View>

        <View style={styles.container}>
          <SButton
            disabled={false}
            onPress={handleSubmit((formValue) => {
              formValue.email = encryption;
              console.log("Form values", formValue);
              fetch(`${api_url}/user-profiles/post-attribute`, {
                method: "POST",
                body: JSON.stringify(formValue),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((json) => {
                  console.log("form output", json);
                  router.push(
                    `InterestsScreen?encryption=${encryption}&picture=${picture}`
                  );
                })
                .catch((e) => {
                  console.log(e);
                  console.log("response", res);
                });
            })}
            style={styles.button}
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderColor: "#e4e4e4",
    borderWidth: 1,
    alignSelf: "stretch",
    marginVertical: 7,
  },
  label: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
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

export default FormScreen;
