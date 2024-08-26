import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { navigationRef } from "@src/utils/navigation";
import RootStack from "./RootStack";

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
