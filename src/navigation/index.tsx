import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./RootStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { navigationRef } from "./utils";

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
