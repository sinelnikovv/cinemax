import { Image, View } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import useNotifications from "@src/hooks/useNotifications";

import Navigation from "./src/navigation";
import { persistor, store } from "./src/store/store";

GoogleSignin.configure({
  webClientId:
    "504074289128-pbdffqp4ue78dm4supg535in9f9u63g5.apps.googleusercontent.com",
});

export const App = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-SemiBold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
  });

  useNotifications();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require("./src/assets/images/splashScreen.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <StatusBar style='light' />
              <Navigation />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    );
  }
};

export default App;
