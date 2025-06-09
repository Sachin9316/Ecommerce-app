import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Yup from "yup";
import { Formik } from 'formik';

const validationSchema = Yup.object({
    mobile: Yup.string()
        .required('Mobile number is required')
        .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
})

const PhoneNumberLoginScreen = () => {

    const handleSendOtp = (values: any) => {
        console.log({
            values
        })

        if (values.mobile < 10) {
            Alert.alert('Invalid Number', 'Please enter a valid phone number');
        } else {
            Alert.alert('OTP Sent!', `OTP sent to ${values.mobile}`);
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
                    <View style={styles.container}>
                        <Text style={styles.title}>Phone Number Login</Text>

                        <TextInput
                            value={values?.mobile}
                            onChangeText={handleChange('mobile')}
                            onBlur={handleBlur('mobile')}
                            maxLength={10}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Send OTP</Text>
                        </TouchableOpacity>
                    </View>
                )
            }}


        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    phoneContainer: {
        width: '100%',
        height: 50,
        marginBottom: 20,
    },
    textInput: {
        paddingVertical: 0,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PhoneNumberLoginScreen;
