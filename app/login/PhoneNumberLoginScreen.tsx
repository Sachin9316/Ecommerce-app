import { Formik } from "formik";
import React from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";

const validationSchema = Yup.object({
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

const PhoneNumberLoginScreen = () => {
  const handleSendOtp = (values: any) => {
    console.log({ values });

    if (values.mobile.length < 10) {
      Alert.alert("Invalid Number", "Please enter a valid phone number");
    } else {
      Alert.alert("OTP Sent!", `OTP sent to ${values.mobile}`);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ mobile: "" }}
      onSubmit={handleSendOtp}
    >
      {({ handleBlur, handleSubmit, handleChange, values }) => {
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
              >
                <View style={{ alignSelf: "flex-end" }}>
                  <Text style={styles.skipText}>Skip</Text>
                </View>

                <View style={styles.formContainer}>
                  <Text style={styles.title}>Log in or sign up</Text>

                  <View style={styles.inputRow}>
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput
                      placeholder="Enter mobile number"
                      value={values.mobile}
                      onChangeText={handleChange("mobile")}
                      onBlur={handleBlur("mobile")}
                      maxLength={10}
                      style={styles.input}
                      inputMode="numeric"
                      keyboardType="phone-pad"
                    />
                  </View>

                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: "#f2f2f2",
  },
  skipText: {
    borderRadius: 20,
    color: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
  },
  countryCode: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 19,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PhoneNumberLoginScreen;
