import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "../screens/Auth/IntroScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";

export type AuthStackNavigatorParamList = {
  IntroScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

const Stack = createStackNavigator<AuthStackNavigatorParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='IntroScreen' component={IntroScreen} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
