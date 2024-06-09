import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./RootStack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
