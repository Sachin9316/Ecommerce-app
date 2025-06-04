import React from "react";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function Navigation() {
  const { cartData } = useSelector((state: any) => state.product);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Detail",
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("Cart pressed!")}
              style={{ marginRight: 10 }}
            >
              <View>
                {cartData?.length > 0 && (
                  <Octicons
                    name="dot-fill"
                    size={20}
                    color="green"
                    style={{ position: "absolute", right: -2, top: -4 }}
                  />
                )}
                <EvilIcons name="cart" size={30} color="black" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
