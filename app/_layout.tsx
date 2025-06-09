import Navigation from "@/components/App/Navigation";
import RouteGaurd from "@/components/Auth/RouteGaurd";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <RouteGaurd>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </RouteGaurd>
  );
}
