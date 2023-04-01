import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-native-date-picker";

const listData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const FormScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
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
              <View style={styles.ageBox}>
                <Text style={styles.label}>Birthday</Text>

                <DatePicker
                  date={value instanceof Date ? value : new Date()}
                  onDateChange={(selectedDate) => {
                    onChange(selectedDate);
                    setDate(selectedDate);
                  }}
                  mode="date"
                />
              </View>
            )}
            rules={{
              required: {
                value: true,
                message: "Please fill out your age",
              },
            }}
          />

          {errors.age && (
            <Text style={styles.errorText}>{errors.age.message}</Text>
          )}

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
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit((formValue) => {
              console.log("Form Value", JSON.stringify(formValue));
              navigation.navigate("InterestsScreen");
            })}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
    borderColor: 'rgba(158, 150, 150, 0)'
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
