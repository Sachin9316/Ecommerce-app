import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather';

function Loading() {
    return (
        <View>
            <Feather name="loader" size={24} color="black" />
        </View>
    )
}

export default Loading;
