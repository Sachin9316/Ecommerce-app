import Navigation from "@/components/App/Navigation";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
