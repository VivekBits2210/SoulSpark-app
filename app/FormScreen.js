import React from "react";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "react-native-elements";
import SButton from "../components/SButton";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";

const listDataGenderFocus = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
  { label: "Any", value: "E" },
];

const listData = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
];

const ages = [""];
for (let i = 18; i <= 150; i++) {
  ages[i] = "" + i;
}

const FormScreen = ({ navigation }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

                {listDataGenderFocus.map((item) => (
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
            style={styles.button}
          >
            SUBMIT
          </SButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    marginBottom: 10,
  },
  radioButtonLabel: {
    fontSize: 15,
    color: "#333",
    marginLeft: 5,
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