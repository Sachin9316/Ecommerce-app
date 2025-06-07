import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function Navigation() {
  const { cartData } = useSelector((state: any) => state.cart);
  const router = useRouter();

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
              onPress={() => router.push("/(tabs)/cart")}
              style={{ marginRight: 10 }}
            >
              <View style={{ position: "relative" }}>
                <EvilIcons name="cart" size={30} color="black" />
                {cartData?.length > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 1,
                      right: 2,
                      backgroundColor: "red",
                      borderRadius: "100%",
                      paddingHorizontal: 4,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {cartData.length}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
