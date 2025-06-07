import React from "react";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

export default function _layout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#537D5D",
          tabBarStyle: {
            backgroundColor: "#121212",
            borderTopColor: "transparent",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: "Products",
            tabBarIcon: ({ color, size }) => (
              <Feather name="shopping-bag" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "My cart",
            headerShown: true,
            headerTitleAlign: 'left',
            headerStatusBarHeight: 1,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="local-grocery-store"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="face-man-profile"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
