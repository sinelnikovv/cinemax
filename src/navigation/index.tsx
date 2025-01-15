import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { navigationRef } from "@src/utils/navigation";

import RootStack from "./RootStack";
import { Routes } from "./routes";

const linking = {
  prefixes: ["cinemax://", "https://cinemax.com"],
  config: {
    screens: {
      [Routes.Movie]: "movie/:id",
    },
  },
};

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
