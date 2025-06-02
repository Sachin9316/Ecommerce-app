import { View } from "react-native";
import React, { lazy } from "react";
import { globalStyles } from "@/styles/globalStyles";
const Home = lazy(() => import("../../components/Home/Home"));

export default function index() {
  return (
    <View style={globalStyles.container}>
      <Home />
    </View>
  );
}
